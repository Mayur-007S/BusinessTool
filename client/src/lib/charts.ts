import * as echarts from "echarts";

export async function initSalesChart(element: HTMLElement, isDarkMode: boolean) {
  const chart = echarts.init(element);
  
  const option = {
    tooltip: {
      trigger: "axis",
      backgroundColor: isDarkMode ? "#1F2937" : "#FFFFFF",
      borderColor: isDarkMode ? "#374151" : "#E5E7EB",
      textStyle: {
        color: isDarkMode ? "#F9FAFB" : "#111827",
      },
    },
    legend: {
      data: ["Revenue", "Sales Count"],
      textStyle: {
        color: isDarkMode ? "#F9FAFB" : "#111827",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      axisLabel: {
        color: isDarkMode ? "#F9FAFB" : "#111827",
      },
      axisLine: {
        lineStyle: {
          color: isDarkMode ? "#374151" : "#E5E7EB",
        },
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: isDarkMode ? "#F9FAFB" : "#111827",
      },
      axisLine: {
        lineStyle: {
          color: isDarkMode ? "#374151" : "#E5E7EB",
        },
      },
      splitLine: {
        lineStyle: {
          color: isDarkMode ? "#374151" : "#E5E7EB",
        },
      },
    },
    series: [
      {
        name: "Revenue",
        type: "line",
        data: [3200, 4500, 5800, 3900, 6000, 8200],
        lineStyle: {
          color: "#1976D2",
        },
        itemStyle: {
          color: "#1976D2",
        },
      },
      {
        name: "Sales Count",
        type: "line",
        data: [32, 45, 58, 39, 60, 82],
        lineStyle: {
          color: "#FF5722",
        },
        itemStyle: {
          color: "#FF5722",
        },
      },
    ],
  };

  chart.setOption(option);
  return chart;
}

export async function initCustomerChart(element: HTMLElement, isDarkMode: boolean) {
  const chart = echarts.init(element);
  
  const option = {
    tooltip: {
      trigger: "item",
      backgroundColor: isDarkMode ? "#1F2937" : "#FFFFFF",
      borderColor: isDarkMode ? "#374151" : "#E5E7EB",
      textStyle: {
        color: isDarkMode ? "#F9FAFB" : "#111827",
      },
    },
    legend: {
      orient: "vertical",
      left: "left",
      textStyle: {
        color: isDarkMode ? "#F9FAFB" : "#111827",
      },
    },
    series: [
      {
        name: "Customer Source",
        type: "pie",
        radius: "70%",
        data: [
          { value: 45, name: "Direct" },
          { value: 27, name: "Referral" },
          { value: 18, name: "Social Media" },
          { value: 10, name: "Other" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        itemStyle: {
          borderRadius: 8,
          borderColor: isDarkMode ? "#1F2937" : "#FFFFFF",
          borderWidth: 2,
        },
        color: ["#1976D2", "#FF5722", "#4CAF50", "#FF9800"],
      },
    ],
  };

  chart.setOption(option);
  return chart;
}

export async function initInventoryChart(element: HTMLElement, isDarkMode: boolean) {
  const chart = echarts.init(element);
  
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
      backgroundColor: isDarkMode ? "#1F2937" : "#FFFFFF",
      borderColor: isDarkMode ? "#374151" : "#E5E7EB",
      textStyle: {
        color: isDarkMode ? "#F9FAFB" : "#111827",
      },
    },
    legend: {
      textStyle: {
        color: isDarkMode ? "#F9FAFB" : "#111827",
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      axisLabel: {
        color: isDarkMode ? "#F9FAFB" : "#111827",
      },
      axisLine: {
        lineStyle: {
          color: isDarkMode ? "#374151" : "#E5E7EB",
        },
      },
      splitLine: {
        lineStyle: {
          color: isDarkMode ? "#374151" : "#E5E7EB",
        },
      },
    },
    yAxis: {
      type: "category",
      data: ["Software", "Services", "Hardware", "Support", "Training"],
      axisLabel: {
        color: isDarkMode ? "#F9FAFB" : "#111827",
      },
      axisLine: {
        lineStyle: {
          color: isDarkMode ? "#374151" : "#E5E7EB",
        },
      },
    },
    series: [
      {
        name: "In Stock",
        type: "bar",
        stack: "total",
        emphasis: {
          focus: "series",
        },
        data: [320, 302, 301, 334, 390],
        itemStyle: {
          color: "#4CAF50",
          borderRadius: [0, 4, 4, 0],
        },
      },
      {
        name: "Low Stock",
        type: "bar",
        stack: "total",
        emphasis: {
          focus: "series",
        },
        data: [120, 132, 101, 134, 90],
        itemStyle: {
          color: "#FF5722",
          borderRadius: [0, 4, 4, 0],
        },
      },
    ],
  };

  chart.setOption(option);
  return chart;
}
