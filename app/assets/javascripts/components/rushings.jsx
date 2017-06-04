class Rushings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            sort: { column: 'id', asc: true }
        };

        this.sortChevron = this.sortChevron.bind(this);
    }
    
    render() {
        let rows = [],
            headers = [];

        // Add each header with a button for sorting by that column
        for (let stat in this.props.stats) {
            let button_text = this.props.stats[stat];
            let chevron = <span className="chevron">{this.sortChevron(stat)}</span>;
            
            headers.push(
                <th key={stat}>
                    <a className="sort-button" onClick={this.sortBy.bind(this, stat)}>
                        {button_text}{chevron}
                    </a>
                </th>
            );
        }

        // Create a row for each Rushing entry
        for (let i = 0; i < this.state.data.length; ++i) {
            rows.push(<Rushing 
                key={this.state.data[i].id} 
                data={this.state.data[i]} 
                stats={this.props.stats} 
                even={i % 2 === 0}/>
            );
        }

        return (
            <div className="rushings">
                <h2 className="title">Rushings</h2>
                <table className="table table-bordered">
                    <thead><tr>
                        {headers}
                    </tr></thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }

    // Sorts the data by the given column
    // 1st click is ASC, 2nd is DESC, 3rd stops sorting by the column
    sortBy(column) {
        this.setState(prevState => {

            // 1st click -> ascending sort
            if (prevState.sort.column != column) {
                prevState.sort.column = column;
                prevState.sort.asc = true;
            } 
            // 2nd click -> descending sort
            else if (prevState.sort.asc == true) {
                prevState.sort.asc = false;
            } 
            // 3rd click -> revert to default sort (id)
            else {
                prevState.sort.column = 'id';
                prevState.sort.asc = true;
            }

            column = prevState.sort.column;

            // Sort the data by the given column
            prevState.data.sort((a, b) => {
                if (a[column] < b[column]) {
                    return prevState.sort.asc ? -1 : 1;
                } else if (a[column] > b[column]) {
                    return prevState.sort.asc ? 1 : -1;
                } 
                // Tiebreaker sort is ID
                else if (a.id < b.id) {
                    return prevState.sort.asc ? -1 : 1;
                } else if (a.id > b.id) {
                    return prevState.sort.asc ? 1 : -1;
                }
                return 0;
            });
            
            return prevState;
        });
    }

    // Returns ▲, ▼, or empty string depending on how the column is being sorted
    sortChevron(column) {
        if (this.state.sort.column == column) {
            return '\u00A0' + (this.state.sort.asc ? '\u25B2' : '\u25BC');
        }
        return '';
    }
}