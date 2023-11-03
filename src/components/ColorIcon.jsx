import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import ThemeContext from './Context/ThemeContext'
import WalletRuby from '../../assets/icons/ruby/wallet.png'
import WalletSea from '../../assets/icons/sea/wallet.png'
import WalletMidnight from '../../assets/icons/midnight/wallet.png'
import WalletMagenta from '../../assets/icons/magenta/wallet.png'
import WalletOrange from '../../assets/icons/orange/wallet.png'
import WalletForest from '../../assets/icons/forest/wallet.png'
import WalletPurple from '../../assets/icons/purple/wallet.png'
import WalletPink from '../../assets/icons/pink/wallet.png'
import WalletNavy from '../../assets/icons/navy/wallet.png'
import WalletAqua from '../../assets/icons/aqua/wallet.png'
import CategoryRuby from '../../assets/icons/ruby/category.png'
import CategorySea from '../../assets/icons/sea/category.png'
import CategoryMidnight from '../../assets/icons/midnight/category.png'
import CategoryMagenta from '../../assets/icons/magenta/category.png'
import CategoryOrange from '../../assets/icons/orange/category.png'
import CategoryForest from '../../assets/icons/forest/category.png'
import CategoryPurple from '../../assets/icons/purple/category.png'
import CategoryPink from '../../assets/icons/pink/category.png'
import CategoryNavy from '../../assets/icons/navy/category.png'
import CategoryAqua from '../../assets/icons/aqua/category.png'
import CommentsRuby from '../../assets/icons/ruby/comments.png'
import CommentsSea from '../../assets/icons/sea/comments.png'
import CommentsMidnight from '../../assets/icons/midnight/comments.png'
import CommentsMagenta from '../../assets/icons/magenta/comments.png'
import CommentsOrange from '../../assets/icons/orange/comments.png'
import CommentsForest from '../../assets/icons/forest/comments.png'
import CommentsPurple from '../../assets/icons/purple/comments.png'
import CommentsPink from '../../assets/icons/pink/comments.png'
import CommentsNavy from '../../assets/icons/navy/comments.png'
import CommentsAqua from '../../assets/icons/aqua/comments.png'
import CalendarRuby from '../../assets/icons/ruby/calendar.png'
import CalendarSea from '../../assets/icons/sea/calendar.png'
import CalendarMidnight from '../../assets/icons/midnight/calendar.png'
import CalendarMagenta from '../../assets/icons/magenta/calendar.png'
import CalendarOrange from '../../assets/icons/orange/calendar.png'
import CalendarForest from '../../assets/icons/forest/calendar.png'
import CalendarPurple from '../../assets/icons/purple/calendar.png'
import CalendarPink from '../../assets/icons/pink/calendar.png'
import CalendarNavy from '../../assets/icons/navy/calendar.png'
import CalendarAqua from '../../assets/icons/aqua/calendar.png'
import MopRuby from '../../assets/icons/ruby/mop.png'
import MopSea from '../../assets/icons/sea/mop.png'
import MopMidnight from '../../assets/icons/midnight/mop.png'
import MopMagenta from '../../assets/icons/magenta/mop.png'
import MopOrange from '../../assets/icons/orange/mop.png'
import MopForest from '../../assets/icons/forest/mop.png'
import MopPurple from '../../assets/icons/purple/mop.png'
import MopPink from '../../assets/icons/pink/mop.png'
import MopNavy from '../../assets/icons/navy/mop.png'
import MopAqua from '../../assets/icons/aqua/mop.png'
import UserRuby from '../../assets/icons/ruby/user.png'
import UserSea from '../../assets/icons/sea/user.png'
import UserMidnight from '../../assets/icons/midnight/user.png'
import UserMagenta from '../../assets/icons/magenta/user.png'
import UserOrange from '../../assets/icons/orange/user.png'
import UserForest from '../../assets/icons/forest/user.png'
import UserPurple from '../../assets/icons/purple/user.png'
import UserPink from '../../assets/icons/pink/user.png'
import UserNavy from '../../assets/icons/navy/user.png'
import UserAqua from '../../assets/icons/aqua/user.png'
import CardRuby from '../../assets/icons/ruby/card.png'
import CardSea from '../../assets/icons/sea/card.png'
import CardMidnight from '../../assets/icons/midnight/card.png'
import CardMagenta from '../../assets/icons/magenta/card.png'
import CardOrange from '../../assets/icons/orange/card.png'
import CardForest from '../../assets/icons/forest/card.png'
import CardPurple from '../../assets/icons/purple/card.png'
import CardPink from '../../assets/icons/pink/card.png'
import CardNavy from '../../assets/icons/navy/card.png'
import CardAqua from '../../assets/icons/aqua/card.png'

export default function ColorIcon({icon, style}) {
  let {themeColor} = useContext(ThemeContext)
  let image
  switch(icon){
    case 'wallet':
      switch (themeColor){
        case 'orange':
          image = WalletOrange
          break
        case 'ruby':
          image = WalletRuby
          break
        case 'sea':
          image = WalletSea
          break
        case 'midnight':
          image = WalletMidnight
          break
        case 'magenta':
          image = WalletMagenta
          break
        case 'forest':
          image = WalletForest
          break
        case 'purple':
          image = WalletPurple
          break
        case 'pink':
          image = WalletPink
          break
        case 'navy':
          image = WalletNavy
          break
        case 'aqua':
          image = WalletAqua
          break
      }
      break
    case 'category':
      switch (themeColor){
        case 'orange':
          image = CategoryOrange
          break
        case 'ruby':
          image = CategoryRuby
          break
        case 'sea':
          image = CategorySea
          break
        case 'midnight':
          image = CategoryMidnight
          break
        case 'magenta':
          image = CategoryMagenta
          break
        case 'forest':
          image = CategoryForest
          break
        case 'purple':
          image = CategoryPurple
          break
        case 'pink':
          image = CategoryPink
          break
        case 'navy':
          image = CategoryNavy
          break
        case 'aqua':
          image = CategoryAqua
          break
      }
      break
    case 'comments':
      switch (themeColor){
        case 'orange':
          image = CommentsOrange
          break
        case 'ruby':
          image = CommentsRuby
          break
        case 'sea':
          image = CommentsSea
          break
        case 'midnight':
          image = CommentsMidnight
          break
        case 'magenta':
          image = CommentsMagenta
          break
        case 'forest':
          image = CommentsForest
          break
        case 'purple':
          image = CommentsPurple
          break
        case 'pink':
          image = CommentsPink
          break
        case 'navy':
          image = CommentsNavy
          break
        case 'aqua':
          image = CommentsAqua
          break
      }
        break
    case 'calendar':
      switch (themeColor){
        case 'orange':
          image = CalendarOrange
          break
        case 'ruby':
          image = CalendarRuby
          break
        case 'sea':
          image = CalendarSea
          break
        case 'midnight':
          image = CalendarMidnight
          break
        case 'magenta':
          image = CalendarMagenta
          break
        case 'forest':
          image = CalendarForest
          break
        case 'purple':
          image = CalendarPurple
          break
        case 'pink':
          image = CalendarPink
          break
        case 'navy':
          image = CalendarNavy
          break
        case 'aqua':
          image = CalendarAqua
          break
      }
          break
    case 'mop':
      switch (themeColor){
        case 'orange':
          image = MopOrange
          break
        case 'ruby':
          image = MopRuby
          break
        case 'sea':
          image = MopSea
          break
        case 'midnight':
          image = MopMidnight
          break
        case 'magenta':
          image = MopMagenta
          break
        case 'forest':
          image = MopForest
          break
        case 'purple':
          image = MopPurple
          break
        case 'pink':
          image = MopPink
          break
        case 'navy':
          image = MopNavy
          break
        case 'aqua':
          image = MopAqua
          break
      }
                break
    case 'user':
      switch (themeColor){
        case 'orange':
          image = UserOrange
          break
        case 'ruby':
          image = UserRuby
          break
        case 'sea':
          image = UserSea
          break
        case 'midnight':
          image = UserMidnight
          break
        case 'magenta':
          image = UserMagenta
          break
        case 'forest':
          image = UserForest
          break
        case 'purple':
          image = UserPurple
          break
        case 'pink':
          image = UserPink
          break
        case 'navy':
          image = UserNavy
          break
        case 'aqua':
          image = UserAqua
          break
      }
          break
    case 'card':
      switch (themeColor){
        case 'orange':
          image = CardOrange
          break
        case 'ruby':
          image = CardRuby
          break
        case 'sea':
          image = CardSea
          break
        case 'midnight':
          image = CardMidnight
          break
        case 'magenta':
          image = CardMagenta
          break
        case 'forest':
          image = CardForest
          break
        case 'purple':
          image = CardPurple
          break
        case 'pink':
          image = CardPink
          break
        case 'navy':
          image = CardNavy
          break
        case 'aqua':
          image = CardAqua
          break
      }
          break
                  
    default:
      break
  }
  return (
    <View>
      <Image source={image} style={style}/>
    </View>
  )
}

const styles = StyleSheet.create({})