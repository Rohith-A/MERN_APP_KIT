import React from 'react';
import {Chart} from 'primereact/chart.js';

class CovidChart extends React.Component {
    constructor(props) {
        super(props)
        this.state={details: props.details,
            data :{
                labels: ['Infected','Recovered','Deaths'],
                datasets: [
                    {
                        data: [300, 50, 100],
                        backgroundColor: [
                            "#0fb1ef",
                            "#3cce3c",
                            "#ff6262"
                        ],
                        hoverBackgroundColor: [
                            "#0fb1ef",
                            "#3cce3c",
                            "#ff6262"
                        ]
                    }]
                },
                chartType: 'pie'
            }
    }
    componentWillReceiveProps(newProps) {
        debugger
        const newData = [newProps.details.confirmed, newProps.details.recovered, newProps.details.deaths];
        this.setState({data: {
            labels: ['Infected','Recovered','Deaths'],
            datasets: [
                {
                    data: newData,
                    backgroundColor: [
                        "#0fb1ef",
                        "#3cce3c",
                        "#ff6262"
                    ],
                    hoverBackgroundColor: [
                        "#0fb1ef",
                        "#3cce3c",
                        "#ff6262"
                    ]
                }]
            } });
        this.setState({chartType: newProps.chartType})
    }
    render() {
        return(
            <div className='charts'>
                <center>
                <Chart type={this.state.chartType} data={this.state.data} width={'500px'}/>
                </center>
            </div>
        )
     };
}

export default CovidChart;
