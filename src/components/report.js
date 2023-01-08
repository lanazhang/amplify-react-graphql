import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  ColumnLayout,
  Container,
  Header,
  SpaceBetween,
  StatusIndicator,
} from '@cloudscape-design/components';
import { CounterLink } from './commons/common-components';
import BarChart from "@cloudscape-design/components/bar-chart";
import PieChart from "@cloudscape-design/components/pie-chart";
import LineChart from "@cloudscape-design/components/line-chart";

function constructBarData(obj) {
  var result =[]

  Object.keys(obj).forEach = (i, idx) => {
    console.log(i);

  }
  //console.log(result);
  return result;
}

export default () => {
   const [report, setReport] = useState(
    {
      "summary": {
        "total_audio": 3484,
        "toxic_audio": 251,
        "avg_confidence": 0.8734,
      },
      "top_categories":
      [
        {
          "title":"PROFANITY",
          "value":123,
        },
        {
          "title":"HATE_SPEECH",
          "value":76,
        },
        {
          "title":"SEXUAL",
          "value":20,
        },
        {
          "title":"INSULT",
          "value":18,
        },
        {
          "title":"VIOLENCE_OR_THREAT",
          "value":9,
        },
        {
          "title":"GRAPHIC",
          "value":3,
        },
        {
          "title":"HARASSMENT_OR_ABUSE",
          "value":2
        },
      ],
      "top_gamers": [
        {x:"supergamer001", y:123},
        {x:"shit-head", y:91},
        {x:"N0tail", y:84},
        {x:"JerAx", y:76},
        {x:"Ceb", y:67},
        {x:"MinD_ContRol", y:53},
        {x:"Mira01", y:52},
        {x:"Zai", y:41},
        {x:"SumaiL", y:39},
        {x:"Somnus", y:21},
      ]
    }
   );

   const Summary = () => (
    <ColumnLayout columns={4} variant="text-grid">
      <SpaceBetween size="l">
          <Box variant="awsui-key-label">Total #s of audios</Box>
          <CounterLink>{report.summary.total_audio.toLocaleString('en-US')}</CounterLink>
      </SpaceBetween>
      <SpaceBetween size="l">
          <Box variant="awsui-key-label">Toxic audios</Box>
          <CounterLink>{report.summary.toxic_audio.toLocaleString('en-US')}</CounterLink>
      </SpaceBetween>
      <SpaceBetween size="l">
          <Box variant="awsui-key-label">Toxicity Ratio</Box>
          <CounterLink>
          {Number(report.summary.toxic_audio/report.summary.total_audio).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:1})}
          </CounterLink>
      </SpaceBetween>
      <SpaceBetween size="l">
          <Box variant="awsui-key-label">Average confidence score</Box>
          <CounterLink>{Number(report.summary.avg_confidence).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2})}</CounterLink>
      </SpaceBetween>
    </ColumnLayout>
  );

  const TopCategories = () => (
    <ColumnLayout columns={1} variant="text-grid">
      <SpaceBetween size="l">
        <PieChart
        hideFilter={false}
        data={report.top_categories}
        detailPopoverContent={(datum, sum) => [
          { key: "Resource count", value: datum.value },
          {
            key: "Percentage",
            value: `${((datum.value / sum) * 100).toFixed(
              0
            )}%`
          },
          { key: "Last update on", value: datum.lastUpdate }
        ]}
        segmentDescription={(datum, sum) =>
          `${datum.value} units, ${(
            (datum.value / sum) *
            100
          ).toFixed(0)}%`
        }
        i18nStrings={{
          detailsValue: "Value",
          detailsPercentage: "Percentage",
          filterLabel: "Filter displayed data",
          filterPlaceholder: "Filter data",
          filterSelectedAriaLabel: "selected",
          detailPopoverDismissAriaLabel: "Dismiss",
          legendAriaLabel: "Legend",
          chartAriaRoleDescription: "pie chart",
          segmentAriaRoleDescription: "segment"
        }}
        ariaDescription="Pie chart showing how many audio are currently in which toxicity category."
        ariaLabel="Pie chart"
        errorText="Error loading data."
        loadingText="Loading chart"
        recoveryText="Retry"
        empty={
          <Box textAlign="center" color="inherit">
            <b>No data available</b>
            <Box variant="p" color="inherit">
              There is no data available
            </Box>
          </Box>
        }
        noMatch={
          <Box textAlign="center" color="inherit">
            <b>No matching data</b>
            <Box variant="p" color="inherit">
              There is no matching data to display
            </Box>
            <Button>Clear filter</Button>
          </Box>
        }
      />        
      </SpaceBetween>
    </ColumnLayout>
  );

  const AudioOvertime = () => {
    return <LineChart
      series={[
        {
          title: "#s of audios",
          type: "line",
          data: [
            { x: new Date(1601006400000), y: 110 },
            { x: new Date(1601007300000), y: 153 },
            { x: new Date(1601008200000), y: 182 },
            { x: new Date(1601009100000), y: 113 },
            { x: new Date(1601010000000), y: 124 },
            { x: new Date(1601010900000), y: 152 },
            { x: new Date(1601011800000), y: 198 },
            { x: new Date(1601012700000), y: 158 },
            { x: new Date(1601013600000), y: 103 },
            { x: new Date(1601014500000), y: 126 },
            { x: new Date(1601015400000), y: 110 },
            { x: new Date(1601016300000), y: 146 },
            { x: new Date(1601017200000), y: 183 },
            { x: new Date(1601018100000), y: 120 },
            { x: new Date(1601019000000), y: 168 },
            { x: new Date(1601019900000), y: 192 },
            { x: new Date(1601020800000), y: 145 },
            { x: new Date(1601021700000), y: 187 },
            { x: new Date(1601022600000), y: 120 },
            { x: new Date(1601023500000), y: 148 },
            { x: new Date(1601024400000), y: 192 },
            { x: new Date(1601025300000), y: 138 },
            { x: new Date(1601026200000), y: 162 },
            { x: new Date(1601027100000), y: 145 },
            { x: new Date(1601028000000), y: 142 },
            { x: new Date(1601028900000), y: 194 },
            { x: new Date(1601029800000), y: 147 },
            { x: new Date(1601030700000), y: 174 },
            { x: new Date(1601031600000), y: 163 },
            { x: new Date(1601032500000), y: 149 },
            { x: new Date(1601033400000), y: 152 },
            { x: new Date(1601034300000), y: 192 },
            { x: new Date(1601035200000), y: 130 }
          ],
          valueFormatter: function o(e) {
            return Math.abs(e) >= 1e9
              ? (e / 1e9).toFixed(1).replace(/\.0$/, "") +
                  "G"
              : Math.abs(e) >= 1e6
              ? (e / 1e6).toFixed(1).replace(/\.0$/, "") +
                "M"
              : Math.abs(e) >= 1e3
              ? (e / 1e3).toFixed(1).replace(/\.0$/, "") +
                "K"
              : e.toFixed(2);
          }
        },
        {
          title: "#s of toxic audios",
          type: "line",
          data: [
            { x: new Date(1601006400000), y: 13 },
            { x: new Date(1601007300000), y: 18 },
            { x: new Date(1601008200000), y: 16 },
            { x: new Date(1601009100000), y: 10 },
            { x: new Date(1601010000000), y: 11 },
            { x: new Date(1601010900000), y: 16 },
            { x: new Date(1601011800000), y: 12 },
            { x: new Date(1601012700000), y: 18 },
            { x: new Date(1601013600000), y: 15 },
            { x: new Date(1601014500000), y: 19 },
            { x: new Date(1601015400000), y: 17 },
            { x: new Date(1601016300000), y: 15 },
            { x: new Date(1601017200000), y: 17 },
            { x: new Date(1601018100000), y: 18 },
            { x: new Date(1601019000000), y: 12 },
            { x: new Date(1601019900000), y: 10 },
            { x: new Date(1601020800000), y: 11 },
            { x: new Date(1601021700000), y: 12 },
            { x: new Date(1601022600000), y: 12 },
            { x: new Date(1601023500000), y: 14 },
            { x: new Date(1601024400000), y: 19 },
            { x: new Date(1601025300000), y: 18 },
            { x: new Date(1601026200000), y: 10 },
            { x: new Date(1601027100000), y: 14 },
            { x: new Date(1601028000000), y: 18 },
            { x: new Date(1601028900000), y: 12 },
            { x: new Date(1601029800000), y: 14 },
            { x: new Date(1601030700000), y: 15 },
            { x: new Date(1601031600000), y: 16 },
            { x: new Date(1601032500000), y: 10 },
            { x: new Date(1601033400000), y: 19 },
            { x: new Date(1601034300000), y: 13 },
            { x: new Date(1601035200000), y: 15 }
          ],
          valueFormatter: function o(e) {
            return Math.abs(e) >= 1e9
              ? (e / 1e9).toFixed(1).replace(/\.0$/, "") +
                  "G"
              : Math.abs(e) >= 1e6
              ? (e / 1e6).toFixed(1).replace(/\.0$/, "") +
                "M"
              : Math.abs(e) >= 1e3
              ? (e / 1e3).toFixed(1).replace(/\.0$/, "") +
                "K"
              : e.toFixed(2);
          }
        }
      ]}
      xDomain={[
        new Date(1601006400000),
        new Date(1601035200000)
      ]}
      yDomain={[0, 200]}
      i18nStrings={{
        filterLabel: "Filter displayed data",
        filterPlaceholder: "Filter data",
        filterSelectedAriaLabel: "selected",
        detailPopoverDismissAriaLabel: "Dismiss",
        legendAriaLabel: "Legend",
        chartAriaRoleDescription: "line chart",
        xTickFormatter: e =>
          e
            .toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: !1
            })
            .split(",")
            .join("\n"),
        yTickFormatter: function o(e) {
          return e.toFixed(0);
        }
      }}
      ariaLabel="#s of audios over time"
      errorText="Error loading data."
      height={200}
      loadingText="Loading chart"
      recoveryText="Retry"
      xScaleType="time"
      yTitle="#s of audios"
      empty={
        <Box textAlign="center" color="inherit">
          <b>No data available</b>
          <Box variant="p" color="inherit">
            There is no data available
          </Box>
        </Box>
      }
      noMatch={
        <Box textAlign="center" color="inherit">
          <b>No matching data</b>
          <Box variant="p" color="inherit">
            There is no matching data to display
          </Box>
          <Button>Clear filter</Button>
        </Box>
      }
    />
  }

  const TopGamers = () => (
    <ColumnLayout columns={1} variant="text-grid">
      <SpaceBetween size="l">
        <BarChart
          hideFilter={true}
          hideLegend={true}
          height={300}
          series={[
            {
              title: "#s of toxic audios",
              type: "bar",
              data: report.top_gamers,
              valueFormatter: e => e
            }
          ]}
          xDomain={["supergamer001", "shit-head","N0tail","JerAx","Ceb","MinD_ContRol","Mira01","Zai","SumaiL","Somnus"]}
          yDomain={[0, 150]}
          i18nStrings={{
            detailPopoverDismissAriaLabel: "Dismiss",
            legendAriaLabel: "Legend",
            chartAriaRoleDescription: "line chart",
            yTickFormatter: function o(e) {
              return e;
            }
          }}
          ariaLabel="Single data series line chart"
          errorText="Error loading data."
          loadingText="Loading chart"
          recoveryText="Retry"
          xScaleType="categorical"
          xTitle="Toxicity category"
          yTitle="#s of audios"
          empty={
            <Box textAlign="center" color="inherit">
              <b>No data available</b>
              <Box variant="p" color="inherit">
                There is no data available
              </Box>
            </Box>
          }
          noMatch={
            <Box textAlign="center" color="inherit">
              <b>No matching data</b>
              <Box variant="p" color="inherit">
                There is no matching data to display
              </Box>
              <Button>Clear filter</Button>
            </Box>
          }
        />
      </SpaceBetween>
    </ColumnLayout>
  );

    return (
      <div>
        <br/>
        <Container
          header={
            <div>
            <Header
              variant="h2"
              info={''}
              description={'Transcribe toxicity analysis overviee'}>
              Analysis overview
            </Header>
            <Box float="right">
              <SpaceBetween direction="horizontal" size="xs">
              </SpaceBetween>
            </Box> 
            </div>
          }>
          <Summary />
        </Container>
        <br />
        <Container
          header={
            <Header
              variant="h2">
              Top toxicity categories
            </Header>
          }>
          <SpaceBetween size="l">
            <TopCategories />
          </SpaceBetween>
        </Container>
        <br />
        <Container
          header={
            <Header
              variant="h2">
              #s of audios over time
            </Header>
          }>
          <SpaceBetween size="l">
            <AudioOvertime />
          </SpaceBetween>
        </Container>
        <br />
        <Container
          header={
            <Header
              variant="h2">
              Top 10 toxic gamers
            </Header>
          }>
          <SpaceBetween size="l">
            <TopGamers />
          </SpaceBetween>
        </Container>
      </div>
    );
}