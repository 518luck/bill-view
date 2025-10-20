import styles from './index.module.less'
import { FaUtensils } from 'react-icons/fa6'
const BillItemCard = () => {
  return (
    <div className={styles.content}>
      <div className={styles.list}>
        <div className={styles.list_title}>
          <div className={styles.list_title_date}>
            <span>09月14日</span>
            <span>星期日</span>
          </div>
          <div className={styles.list_title_money}>支出 : 73.00</div>
        </div>

        <div className={styles.list_content}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
            return (
              <div className={styles.list_item} key={item}>
                <div className={styles.list_item_icon}>
                  <FaUtensils />
                  <span>餐饮</span>
                </div>
                <div className={styles.list_item_money}>
                  <span>-73.00</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.list}>
        <div className={styles.list_title}>
          <div className={styles.list_title_date}>
            <span>09月14日</span>
            <span>星期日</span>
          </div>
          <div className={styles.list_title_money}>支出 : 73.00</div>
        </div>

        <div className={styles.list_content}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
            return (
              <div className={styles.list_item} key={item}>
                <div className={styles.list_item_icon}>
                  <FaUtensils />
                  <span>餐饮</span>
                </div>
                <div className={styles.list_item_money}>
                  <span>-73.00</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.list}>
        <div className={styles.list_title}>
          <div className={styles.list_title_date}>
            <span>09月14日</span>
            <span>星期日</span>
          </div>
          <div className={styles.list_title_money}>支出 : 73.00</div>
        </div>

        <div className={styles.list_content}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => {
            return (
              <div className={styles.list_item} key={item}>
                <div className={styles.list_item_icon}>
                  <FaUtensils />
                  <span>餐饮</span>
                </div>
                <div className={styles.list_item_money}>
                  <span>-73.00</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default BillItemCard
