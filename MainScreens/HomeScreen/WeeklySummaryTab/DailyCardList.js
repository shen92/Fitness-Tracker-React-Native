import React, {Component} from 'react';
import DailyCard from "./DailyCard";

class DailyCardList extends Component {
    constructor(props) {
        super(props);

    }

    getWeekList() {
        let week = [];
        let i = 0;
        for (const day of Object.values(this.props.data.week)) {
            week.push(
                <DailyCard key={i} index={i} date={day[0]} data={day}/>
            )
            i++;
        }
        return week;
    }

    render() {
        return (
            <React.Fragment>
                {this.getWeekList()}
            </React.Fragment>
        );
    }
}

export default DailyCardList;