class Rushings extends React.Component {
    constructor(props) {
        super(props)
    }

    static get defaultProps() {
        return {
            rushings: []
        }
    }
    
    render() {
        rows = [];
        for (let rushing of this.props.data) {
            rows.push(<Rushing rushing={rushing}/>);
        }

        return (
            <div className="rushings">
                <h2 className="title">Rushings</h2>
                <table className="table table-bordered">
                    <thead><tr>
                        <th>Player</th>
                        <th>Team</th>
                        <th>Pos</th>
                        <th>Att/G</th>
                        <th>Att</th>
                        <th>Yrds</th>
                        <th>Avg</th>
                        <th>Yds/G</th>
                        <th>TD</th>
                        <th>Lng</th>
                        <th>1st</th>
                        <th>1st%</th>
                        <th>20+</th>
                        <th>40+</th>
                        <th>FUM</th>
                    </tr></thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }
}