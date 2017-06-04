class Rushing extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let columns = [];
        for (let stat in this.props.stats) {
            columns.push(<td key={stat}>{this.props.data[stat]}</td>)
        }
        return (<tr className={this.props.even ? 'even-row' : ''}>{columns}</tr>);
    }
}