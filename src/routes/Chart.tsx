import ApexChart from "react-apexcharts";
import React from "react";
import styled from "styled-components";
const Container = styled.div`
    margin: 100px auto;
    height: 60%;
    width: 60%;
`;

function Chart() {
  
    return (<Container>
        <ApexChart type="area" 
        series={[
            {   name: "hello",
                data: [1,2,3,4,5,6],
            },
            {
                name: "sales",
                data: [15,18,15,78,40],
            }
        ]}
        options={{
            chart: {
                height: 100,
                width: 100,
            },
        }}/>
        </Container>
    );
}

export default Chart;