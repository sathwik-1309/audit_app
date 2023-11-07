import React from "react"
import DebitForm from "./DebitForm";
import CreditForm from "./CreditForm";
import PaidByPartyForm from "./PaidByPartyForm";
import SplitForm from "./SplitForm";
import DownArrowColor from '../../../assets/icons/up-arrow-color.png'
import DownArrow from '../../../assets/icons/down-arrow.png'
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SettledByPartyForm from "./SettledByPartyForm";
import SettledByYouForm from "./SettledByYouForm";

export function TransactionBoxItem({ type, theme, selected, setselected, data, party }) {
  const image_source = type == selected ? DownArrowColor : DownArrow;
  const openForm = () => {
    if (type == selected) {
      setselected('');
    } else {
      setselected(type);
    }
  }
  let form;
  switch (type) {
    case 'DEBIT':
      form = <DebitForm data={data} close={setselected} />;
      break;
    case 'CREDIT':
      form = <CreditForm data={data} close={setselected}  />;
      break;
    case 'PAID BY PARTY':
      form = <PaidByPartyForm data={data} close={setselected} />;
      break;
    case 'SPLIT':
      form = <SplitForm data={data} close={setselected}  />;
      break;
    case 'SETTLED BY PARTY':
      form = <SettledByPartyForm data={data} close={setselected} party={party}/>;
      break;
    case 'SETTLED BY YOU':
      form = <SettledByYouForm data={data} close={setselected} party={party}/>;
      break;
    default:
      break;
  }
  const bg_color = type == selected ? theme.bg3 : theme.bg1;
  const text_color = type == selected ? theme.c1 : theme.c3;

  return (
    <TouchableOpacity style={[styles.tb_item]} onPress={openForm}>
      <View style={[styles.tb_item_header, bg_color]}>
        <View style={styles.tb_label}><Text style={[styles.tb_item_text, text_color]}>{type}</Text></View>
        <Image source={image_source} style={{ height: 20, width: 20 }} />
      </View>
      {
        type == selected &&
        form
      }
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tb_item: {
    marginVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tb_item_header: {
    width: 200,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
  },
  tb_item_text: {
    fontWeight: '600',
  },
  tb_label: {
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
})