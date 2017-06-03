class Rushing extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.rushing.player}</td>
                <td>{this.props.rushing.team}</td>
                <td>{this.props.rushing.position}</td>
                <td>{this.props.rushing.attempts_per_game}</td>
                <td>{this.props.rushing.attempts}</td>
                <td>{this.props.rushing.yards}</td>
                <td>{this.props.rushing.average_yards_per_attempt}</td>
                <td>{this.props.rushing.yards_per_game}</td>
                <td>{this.props.rushing.touchdowns}</td>
                <td>{this.props.rushing.longest_rush}</td>
                <td>{this.props.rushing.first_downs}</td>
                <td>{this.props.rushing.first_down_percentage}</td>
                <td>{this.props.rushing.twenty_yards_each}</td>
                <td>{this.props.rushing.forty_yards_each}</td>
                <td>{this.props.rushing.fumbles}</td>
            </tr>
        );
    }
}