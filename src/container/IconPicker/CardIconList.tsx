import {
  MdSportsSoccer,
  MdPedalBike,
  MdSportsEsports,
  MdSportsFootball,
  MdSportsBasketball,
  MdSportsBaseball,
  MdSportsTennis,
  MdSportsRugby,
  MdSportsGolf,
  MdSportsHandball,
  MdSportsHockey,
  MdSportsKabaddi,
  MdSportsMartialArts,
  MdSportsMma,
  MdSportsVolleyball,
  MdFitnessCenter,
  MdRestaurant,
  MdFastfood,
  MdLocalCafe,
  MdLocalDining,
  MdLocalBar,
  MdLocalDrink,
  MdLocalPizza,
  MdIcecream,
  MdCake,
  MdDonutSmall,
  MdDonutLarge,
  MdLocalGroceryStore,
  MdKitchen,
  MdLocalMall,
  MdShoppingCart,
  MdLocalPharmacy,
  MdStorefront,
  MdLocalHospital,
  MdMedicalServices,
  MdSick,
  MdHealthAndSafety,
  MdAddIcCall,
  MdAddLocationAlt,
  MdAttachMoney,
  MdBabyChangingStation,
  MdMenuBook,
  MdLibraryBooks,
  MdLocalLibrary,
  MdCastForEducation,
  MdImportContacts,
  MdQuiz,
  MdLibraryMusic,
  MdWorkspacePremium,
  MdEmojiObjects,
  MdAssignment,
  MdAssignmentTurnedIn,
  MdSchool,
  MdDirectionsCar,
  MdDirectionsBus,
  MdDirectionsBike,
  MdDirectionsRailway,
  MdTrain,
  MdTram,
  MdSubway,
  MdFlight,
  MdAirportShuttle,
  MdTaxiAlert,
  MdDirectionsBoat,
  MdDirectionsWalk,
  MdLocalTaxi,
  MdTraffic,
  MdTwoWheeler,
  MdElectricScooter,
  MdElectricBike,
  MdLocalGasStation,
  MdShoppingBasket,
  MdShoppingBag,
  MdAddShoppingCart,
  MdRemoveShoppingCart,
  MdPayment,
  MdCreditCard,
  MdPriceChange,
  MdLocalOffer,
  MdRedeem,
  MdStore,
  MdReceiptLong,
  MdInventory,
  MdLoyalty,
  MdDiscount,
  MdWarehouse,
  MdLocalConvenienceStore,
  MdPaid,
  MdStoreMallDirectory,
  MdCheckroom,
  MdCardGiftcard,
  MdHome,
  MdApartment,
  MdLocalLaundryService,
  MdCleaningServices,
  MdWater,
  MdFlashOn,
  MdLightbulb,
  MdHomeRepairService,
  MdWaterDrop,
  MdHouseSiding,
  MdMedicationLiquid,
  MdChair,
  MdBed,
  MdTableBar,
  MdWeekend,
  MdDeck,
  MdBathtub,
  MdWallpaper,
  MdSportsGymnastics,
  MdDirectionsRun,
  MdHiking,
  MdPool,
  MdSportsCricket,
  MdWorkOutline,
  MdBusiness,
  MdBusinessCenter,
  MdFolder,
  MdFolderOpen,
  MdDescription,
  MdEventAvailable,
  MdAccessTime,
  MdAccountBalance,
  MdMonetizationOn,
  MdSavings,
  MdWallet,
  MdMoney,
  MdPointOfSale,
  MdLocalAtm,
} from 'react-icons/md'

import styles from './styles.module.less'
import { useState, type SVGProps } from 'react'
// 定义图标数组
const iconCategories = [
  {
    title: '娱乐',
    icons: [
      MdPedalBike,
      MdSportsEsports,
      MdSportsFootball,
      MdSportsBasketball,
      MdSportsBaseball,
      MdSportsTennis,
      MdSportsSoccer,
      MdSportsRugby,
      MdSportsGolf,
      MdSportsHandball,
      MdSportsHockey,
      MdSportsKabaddi,
      MdSportsMartialArts,
      MdSportsMma,
      MdSportsVolleyball,
      MdFitnessCenter,
    ],
  },
  {
    title: '饮食',
    icons: [
      MdRestaurant,
      MdFastfood,
      MdLocalCafe,
      MdLocalDining,
      MdLocalBar,
      MdLocalDrink,
      MdLocalPizza,
      MdIcecream,
      MdCake,
      MdDonutSmall,
      MdDonutLarge,
      MdLocalGroceryStore,
      MdKitchen,
      MdLocalMall,
      MdShoppingCart,
      MdLocalPharmacy,
      MdStorefront,
    ],
  },
  {
    title: '医疗',
    icons: [
      MdLocalHospital,
      MdMedicalServices,
      MdSick,
      MdHealthAndSafety,
      MdAddIcCall,
      MdAddLocationAlt,
      MdAttachMoney,
      MdBabyChangingStation,
      MdMedicationLiquid,
    ],
  },
  {
    title: '学习',
    icons: [
      MdSchool,
      MdMenuBook,
      MdLibraryBooks,
      MdLocalLibrary,
      MdCastForEducation,
      MdImportContacts,
      MdQuiz,
      MdLibraryMusic,
      MdWorkspacePremium,
      MdEmojiObjects,
      MdAssignment,
      MdAssignmentTurnedIn,
      MdSchool,
    ],
  },
  {
    title: '交通',
    icons: [
      MdDirectionsCar,
      MdDirectionsBus,
      MdDirectionsBike,
      MdDirectionsRailway,
      MdTrain,
      MdTram,
      MdSubway,
      MdFlight,
      MdAirportShuttle,
      MdTaxiAlert,
      MdDirectionsBoat,
      MdDirectionsWalk,
      MdLocalTaxi,
      MdTraffic,
      MdTwoWheeler,
      MdElectricScooter,
      MdElectricBike,
      MdLocalGasStation,
    ],
  },
  {
    title: '购物',
    icons: [
      MdCheckroom,
      MdCardGiftcard,
      MdShoppingBasket,
      MdShoppingBag,
      MdAddShoppingCart,
      MdRemoveShoppingCart,
      MdPayment,
      MdCreditCard,
      MdPriceChange,
      MdLocalOffer,
      MdRedeem,
      MdStore,
      MdReceiptLong,
      MdInventory,
      MdLoyalty,
      MdDiscount,
      MdWarehouse,
      MdLocalConvenienceStore,
      MdPaid,
      MdStoreMallDirectory,
    ],
  },
  {
    title: '生活',
    icons: [
      MdHome, // 住房 / 家
      MdApartment, // 公寓 / 住处
      MdLocalLaundryService, // 洗衣 / 家务
      MdCleaningServices, // 清洁 / 家务
      MdWater, // 水费
      MdFlashOn, // 电费 / 电力
      MdLightbulb, // 灯泡 / 电费或生活用品
      MdHomeRepairService, // 家居维修
      MdWaterDrop, // 水资源 / 水费
      MdHouseSiding, // 房屋 / 家庭支出
    ],
  },
  {
    title: '家居',
    icons: [
      MdChair,
      MdBed,
      MdTableBar,
      MdWeekend,
      MdDeck,
      MdBathtub,
      MdWallpaper,
    ],
  },
  {
    title: '健身',
    icons: [
      MdSportsGymnastics,
      MdDirectionsRun,
      MdHiking,
      MdPool,
      MdSportsCricket,
    ],
  },
  {
    title: '办公',
    icons: [
      MdWorkOutline,
      MdBusiness,
      MdBusinessCenter,
      MdFolder,
      MdFolderOpen,
      MdDescription,
      MdEventAvailable,
      MdAccessTime,
    ],
  },
  {
    title: '收入',
    icons: [
      MdAccountBalance,
      MdMonetizationOn,
      MdSavings,
      MdWallet,
      MdMoney,
      MdPointOfSale,
      MdLocalAtm,
    ],
  },
]

interface CardIconListProps {
  onIconSelect?: (
    icon: React.ReactElement<SVGProps<SVGSVGElement>>,
    title: string
  ) => void
}
type OnIconSelectType = NonNullable<CardIconListProps['onIconSelect']>
const CardIconList = ({ onIconSelect }: CardIconListProps) => {
  const [currentCategory, setCurrentCategory] = useState({
    iconIndex: 0,
    title: '娱乐',
  })

  const handleIconClick: OnIconSelectType = (icon, title) => {
    if (onIconSelect) {
      onIconSelect(icon, title)
    }
  }

  return (
    <>
      {iconCategories.map((category, index) => (
        <div key={index} className={styles.CardIconList}>
          <div className={styles.title}>{category.title}</div>
          <div className={styles.icons}>
            {category.icons.map((Icon, iconIndex) => (
              <Icon
                key={iconIndex}
                size={25}
                color={
                  currentCategory.iconIndex === iconIndex &&
                  currentCategory.title === category.title
                    ? '#7d39eb'
                    : ''
                }
                onClick={() => {
                  setCurrentCategory({
                    iconIndex,
                    title: category.title,
                  })
                  handleIconClick(<Icon size={31} />, category.title)
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

export default CardIconList
