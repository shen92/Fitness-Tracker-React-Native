import React, { Component } from "react";
import _ from "lodash";
import DailyCard from "./DailyCard";

class DailyCardList extends Component {
  constructor(props) {
    super(props);
  }

  getWeekList() {
    let week = [];
    let i = 0;
    let sortedWeek = _.cloneDeep(this.props.data.week);
    sortedWeek.sort((d1, d2) => {
      return new Date(d2[0]) - new Date(d1[0]);
    });
    for (const day of Object.values(sortedWeek)) {
      week.push(<DailyCard key={day[0]} index={i} date={day[0]} data={day} />);
      i++;
    }

    return week;
  }

  render() {
    return <React.Fragment>{this.getWeekList()}</React.Fragment>;
  }
}

export default DailyCardList;
