import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { BarChart} from "react-native-chart-kit"
import { Styles } from '../Styles'
import ThemeContext from './Context/ThemeContext'

export default function BarGraph({data, header, small}) {
  let {themeColor} = useContext(ThemeContext)
  const theme = Styles[themeColor]
  const chartConfig = {
    backgroundGradientFrom: "white",
    backgroundGradientTo: "white",
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    decimalPlaces: 0,
    color: (opacity = 1) => `${theme.c1.color}`,
    barPercentage: 0.8,
    useShadowColorFromDataset: false,
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientToOpacity: 1,
    barRadius: 5,
    propsForBackgroundLines: styles.bg_lines,
    strokeWidth: 20,
    propsForLabels: small ? styles.labels_small : styles.labels,
  }
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', height: 30}}><Text style={[theme.c1, {fontWeight: '600', fontSize: 14}]}>{header}</Text></View>
      <BarChart
        style={styles.graph}
        data={data}
        width={350}
        height={300}
        yAxisLabel="₹ "
        chartConfig={chartConfig}
        verticalLabelRotation={0}
        fromZero
        withInnerLines={false}
        showBarTops={false}
        showValuesOnTopOfBars
      />
    </View>
  )
}

const styles = StyleSheet.create({
  graph: {
    marginHorizontal: 8,
    marginRight: 20
  },
  container: {
    marginBottom: 20,
    borderColor: 'gray',
    borderWidth: 1,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    paddingTop: 10
  },
  bg_lines: {
    opacity: 0.3,
  },
  labels: {
    fontSize: 13,
    fontWeight: '500',
  },
  labels_small: {
    fontSize: 11,
    fontWeight: '500',
  }
})