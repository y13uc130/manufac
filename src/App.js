import ReactECharts from 'echarts-for-react';
import wineData from './wineData';
import './App.scss';


function App() {
  const finalData = wineData.map((datum) => {
    return [datum['Color intensity'], datum['Hue']]
  })
  let dataOfMalicAcidForAlcohol1 = [], dataOfMalicAcidForAlcohol2 = [], dataOfMalicAcidForAlcohol3 = [];
  let finalDataForBarChart;
  wineData.forEach(datum => {
    if (datum['Alcohol'] === 1) {
      dataOfMalicAcidForAlcohol1.push(datum['Malic Acid'])
    } else if (datum['Alcohol'] === 2) {
      dataOfMalicAcidForAlcohol2.push(datum['Malic Acid'])
    } else if (datum['Alcohol'] === 3) {
      dataOfMalicAcidForAlcohol3.push(datum['Malic Acid'])
    }
    console.log({dataOfMalicAcidForAlcohol3, dataOfMalicAcidForAlcohol2, dataOfMalicAcidForAlcohol1})
  })
  const getAverage = (data) => {
    return (data.reduce((a,b) => a+b, 0)/data.length).toFixed(2)
  }
  finalDataForBarChart = [
    [1,getAverage(dataOfMalicAcidForAlcohol1)], 
    [2,getAverage(dataOfMalicAcidForAlcohol2)], 
    [3,getAverage(dataOfMalicAcidForAlcohol3)], 
  ];
  console.log({finalDataForBarChart})
  const optionsForScatterPlot = {
    grid: {
      borderColor: '#eee',
      x: 80,
      y: 60,
      x2: 120,
      y2: 60
    },
    xAxis: {
      type: 'value',
      name: 'Color Intensity'
    },
    yAxis: {
      type: 'value',
      name: 'Hue'
    },
    series: [
      {
        data: finalData,
        type: 'scatter',
        name: 'Scatter Plot'
      },
    ],
    toolbox: {
      show: true,
      showTitle: true,
      feature: {
        mark: {
          show: true,
          title: {
          mark: 'Mark Tool',
            markUndo: 'Undo Last Mark',
              markClear: 'Clear Marks'
          }
        },
        dataZoom: {
          show: true,
          title: {
            dataZoom: 'Range Zoom',
            dataZoomReset: 'Undo Zoom'
          },
        },           
        dataView: {
          show: true,
          title: 'Data View',
          lang: ['Data View', 'Close','Refresh']
        },
        magicType: {
          show: true
        },
        restore: { show: true, title: 'Restore'},
        saveAsImage: {
          show: true,
          title: 'Save as Image',
          lang:['Click to Save']
        }
      }
    },
    tooltip: {
      trigger: 'axis',
    },
  };
  const optionsForBarChart = {
    grid: {
      borderColor: '#eee',
      x: 80,
      y: 60,
      x2: 300,
      y2: 40
    },
    xAxis: {
      type: 'value',
      name: 'Alcohol',
      data: [1,2,3]
    },
    yAxis: {
      type: 'value',
      name: 'Malic Acid'
    },
    series: [
      {
        data: finalDataForBarChart,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      },
    ],
  }
  return (
    <div className="App">
        <ReactECharts option={optionsForScatterPlot}  />
        <ReactECharts option={optionsForBarChart} />
    </div>
  );
}

export default App;
