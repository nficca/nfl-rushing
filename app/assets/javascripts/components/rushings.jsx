class Rushings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            sort: { column: 'id', asc: true }
        };

        this.noResults = this.noResults.bind(this);
        this.getCSVParams = this.getCSVParams.bind(this);
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
                <div className="meta">
                    <h2 className="title">Rushings</h2>
                    <a href={this.getCSVParams()} className="pull-right btn btn-default">Download CSV</a>
                    <div className="search-container form-group pull-right">
                        <input type="text" className="form-control" placeholder='Search Player' onChange={this.handleSearch.bind(this)}></input>
                    </div>
                </div>
                <table className="table table-bordered">
                    <thead><tr>
                        {headers}
                    </tr></thead>
                    <tbody>
                        {rows.length? rows : this.noResults()}
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
                a_id = a.id;
                b_id = b.id;

                // Longest rush must be parsed for an int since it's a string with a number
                a = column === 'longest_rush' ? parseInt(a[column]) : a[column];
                b = column === 'longest_rush' ? parseInt(b[column]) : b[column];

                if (a < b) {
                    return prevState.sort.asc ? -1 : 1;
                } else if (a > b) {
                    return prevState.sort.asc ? 1 : -1;
                } 
                // Tiebreaker sort is ID
                else if (a_id < b_id) {
                    return prevState.sort.asc ? -1 : 1;
                } else if (a_id > b_id) {
                    return prevState.sort.asc ? 1 : -1;
                }
                return 0;
            });

            return prevState;
        });
    }

    handleSearch(event) {
        query = event.target.value.toLowerCase();
        this.setState(prevState => {
            // filter the rows
            prevState.data = this.props.data.filter(row => {
                return row.player.toLowerCase().indexOf(query) > -1;
            })

            return prevState;
        });
    }

    getCSVParams() {
        return '/rushings.csv?' +
            `sortby=${this.state.sort.column}&` +
            `order=${this.state.sort.asc ? 'asc' : 'desc'}`
    }

    // Returns ▲, ▼, or empty string depending on how the column is being sorted
    sortChevron(column) {
        if (this.state.sort.column == column) {
            return '\u00A0' + (this.state.sort.asc ? '\u25B2' : '\u25BC');
        }
        return '';
    }

    noResults() {
        return <tr><td className="no-results" colSpan={Object.keys(this.props.stats).length}>No Results</td></tr>
    }
}