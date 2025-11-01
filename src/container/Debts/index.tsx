import { useEffect, useState } from 'react'
import { ProgressBar, SwipeAction } from 'antd-mobile'
import cs from 'classnames'
import type { Action } from 'antd-mobile/es/components/swipe-action'
import styles from './styles.module.less'
import PieChart from '@/container/Debts/PieChart'
import AdvanceListItem from '@/container/Debts/AdvanceListItem'
import Flex from '@/components/Flex'
import {
  useGetDebts,
  useDeleteDebtMutation,
  useGetDebtPieChart,
  type debtsResponse,
} from '@/api'
import UpdateSavingsPrepayment from '@/container/Debts/UpdateSavingsPrepayment'
import AddPrepayment from '@/container/Debts/AddPrepayment'
import RepayPrepayment from '@/container/Debts/RepayPrepayment'
import EditPrepayment from '@/container/Debts/EditPrepayment'

// 根据预支比例显示不同提示
const getWarningMessage = (advancePercent: number) => {
  if (advancePercent > 20) {
    return '⚠️ 警告：预支比例过高，财务压力较大，建议减少开支'
  } else if (advancePercent > 10) {
    return 'ℹ️ 提示：预支比例适中，在可控范围内，请注意平衡收支'
  } else {
    return '✅ 状态良好：预支比例较低，财务状况稳健，继续保持'
  }
}
const Debts = () => {
  const [percent, setPercent] = useState<number>(0)
  const [progressColor, setProgressColor] =
    useState<string>('hsl(0, 100%, 50%)')

  //控制修改储蓄的弹窗是否显示
  const [visibleSavings, setVisibleSavings] = useState<boolean>(false)
  // 控制添加预支的弹窗是否显示
  const [visibleAddPrepayment, setVisibleAddPrepayment] =
    useState<boolean>(false)
  // 控制还款弹窗是否显示
  const [visibleRepayPrepayment, setVisibleRepayPrepayment] =
    useState<boolean>(false)
  // 控制编辑预支的弹窗是否显示
  const [visibleEditPrepayment, setVisibleEditPrepayment] =
    useState<boolean>(false)
  // 当前选中的预支项
  const [currentDebt, setCurrentDebt] = useState<debtsResponse>()

  // 获取所有预支
  const { data: debts = [] } = useGetDebts()
  // 计算本月共需要偿还的金额
  const monthRepay = debts.reduce(
    (acc, cur) => acc + Number(cur.current_month_due),
    0
  )
  //计算总共欠款金额
  const totalDebt = debts.reduce(
    (acc, cur) => acc + Number(cur.total_amount),
    0
  )

  // 获取资产债务饼图数据
  const { data: pieChartData } = useGetDebtPieChart()

  // 预支占比
  const advance = (
    ((pieChartData?.debt || 0) / (pieChartData?.balance || 0)) *
    100
  ).toFixed(1)

  // 删除预支
  const { mutate: deleteDebt } = useDeleteDebtMutation()
  const handleSwipeAction = (action: Action, item: debtsResponse) => {
    if (action.key === 'delete') {
      deleteDebt(item.id)
    }
    if (action.key === 'repay') {
      setVisibleRepayPrepayment(true)
      setCurrentDebt(item)
    }
  }

  useEffect(() => {
    setPercent(Number(advance))
    // 根据advance调整颜色，advance越高，红色越多，越少红色越少
    // 低于20%-10%为橙色，低于10%逐渐变为绿色
    let hue
    const advanceNum = Number(advance)

    if (advanceNum <= 10) {
      // 低于10%: 从绿色(120度)逐渐变为橙色(60度)
      hue = 60 + (advanceNum / 10) * 60 // 60-120度范围
    } else if (advanceNum <= 20) {
      // 10%-20%: 从橙色(60度)逐渐变为红色(0度)
      hue = (20 - advanceNum) * 6 // 0-60度范围
    } else {
      // 高于20%: 保持红色
      hue = 0 // 0度为红色
    }

    setProgressColor(`hsl(${hue}, 100%, 50%)`)
  }, [advance])
  const rightActions: Action[] = [
    {
      key: 'repay',
      text: '还款',
      color: '#a2f78d9b',
    },
    {
      key: 'delete',
      text: '删除',
      color: 'danger',
    },
  ]
  return (
    <div className={cs(styles.commonBackground, styles.deficit)}>
      <div className={styles.header}>
        <PieChart pieChartData={pieChartData} />
        <div className={styles.PreAllocationRatio}>
          <span>预支占比 : {advance}%</span>
          <ProgressBar
            style={{ '--fill-color': progressColor, '--track-width': '11px' }}
            percent={percent}
            className={styles.PreAllocationRatio_progress}
          />
        </div>
      </div>
      <div className={styles.message}>
        <span>{getWarningMessage(Number(advance))}</span>
      </div>
      <div className={styles.content}>
        <Flex justify='between'>
          <div
            className={styles.content_btn}
            onClick={() => setVisibleSavings(true)}>
            修改储蓄
          </div>
          <div
            className={styles.content_btn}
            onClick={() => setVisibleAddPrepayment(true)}>
            添加预支
          </div>
        </Flex>

        <div className={styles.content_hr} />

        <span className={styles.content_title}>
          <span>本月偿还：{monthRepay.toFixed(2)}</span>
          <span>剩余欠款：{totalDebt.toFixed(2)}</span>
        </span>

        <div className={styles.content_list}>
          {debts.map((item) => (
            <SwipeAction
              key={item.id}
              rightActions={rightActions}
              onAction={(action) => handleSwipeAction(action, item)}>
              <AdvanceListItem
                debtsItem={item}
                onClick={(item) => {
                  setVisibleEditPrepayment(true)
                  setCurrentDebt(item)
                }}
              />
            </SwipeAction>
          ))}
        </div>
      </div>
      <UpdateSavingsPrepayment
        visible={visibleSavings}
        setVisible={setVisibleSavings}
      />
      <AddPrepayment
        visible={visibleAddPrepayment}
        setVisible={setVisibleAddPrepayment}
      />
      <RepayPrepayment
        visible={visibleRepayPrepayment}
        setVisible={setVisibleRepayPrepayment}
        currentDebt={currentDebt}
        setCurrentDebt={setCurrentDebt}
      />
      <EditPrepayment
        visible={visibleEditPrepayment}
        setVisible={setVisibleEditPrepayment}
        currentDebt={currentDebt}
        setCurrentDebt={setCurrentDebt}
      />
    </div>
  )
}
export default Debts
