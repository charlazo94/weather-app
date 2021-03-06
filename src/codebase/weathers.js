import React from 'react';
import {Route, Link} from 'react-router-dom'
import Weather from "./weather";
import axios from 'axios'

export default class Weathers extends React.Component {
    constructor() {
        super();
        this.state = {
            weathers: undefined,
            weathersList: undefined
        };
        // this.sendInfo = this.sendInfo().bind(this)
    }

    componentWillMount() {

        axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=Desamparados&appid=5e3ef2fdcbd356c5e59a3e90f604fd98`)
            .then(response => this.setState({weathersList: response.data.list}))
    }

    renderList(date, weather, others) {
        const newDate = new Date(date);
        const day = newDate.toString().substr(0, newDate.toString().indexOf(' '));
        console.log(weather)
        return (
            <Link className='weather-info' to={`/${day}`}>
                <label>{day}</label>
            <div  onClick={() => this.sendInfo(others)}>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
            <div className='temps'>
                <p className='temp-max'>{weather.main.temp_max}</p>
                <p className='temp-min'>{weather.main.temp_min}</p>
            </div>
        </div>
            </Link>);
    }

    sendInfo(weathers) {

        this.setState({weathers: weathers});
    }

    render() {

        if (typeof this.state.weathersList !== "undefined" && this.state.weathersList.length > 0) {
            const listFiltrada = this.state.weathersList.reduce((r, a) => {
                const newKey = a.dt_txt.substr(0, a.dt_txt.indexOf(' '))
                r[newKey] = [...r[newKey] || [], a];
                return r;
            }, {});
            var result = [];

            for (var i in listFiltrada) {
                result.push([i, listFiltrada [i]]);
            }
            return (<div className='weathers-body'>
                {
                    result.map(array => {
                        return this.renderList(array[0], array[1][0], array[1]);
                    })
                }
                {typeof this.state.weathers !== undefined ?
                    <Route path='/:name_of_day' component={() => <Weather info={this.state.weathers}/>}/> : null}
            </div>);
        }

        return <div>no hay</div>
    }
}

