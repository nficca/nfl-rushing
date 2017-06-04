class RushingsController < ApplicationController
    def index
        @rushings = Rushing.all
        @stats = stat_names

        respond_to do |format|
            format.html
            format.csv do
                send_data csv(@rushings), filename: "rushings-#{Date.today}.csv" 
            end
        end
    end

    def csv(rushings)
        columns = Rushing.column_names - %w[created_at updated_at];

        rushings = rushings.select(columns)

        if params.has_key?(:sortby) && Rushing.has_attribute?(params[:sortby]) && params.has_key?(:order)
            rushings.order!(params[:sortby] + (if params[:order] === 'desc' then ' DESC' else ' ASC' end))
        end
        csv_string = CSV.generate do |csv|
            csv << columns
            rushings.each do |rushing|
                csv << rushing.attributes.values
            end
        end
    end

    private

    def stat_names
        {
            player: "Player",
            team: "Team",
            position: "Pos",
            attempts: "Att",
            attempts_per_game: "Att/G",
            yards: "Yds",
            average_yards_per_attempt: "Avg",
            yards_per_game: "Yds/G",
            touchdowns: "TD",
            longest_rush: "Lng",
            first_downs: "1st",
            first_down_percentage: "1st%",
            twenty_yards_each: "20+",
            forty_yards_each: "40+",
            fumbles: "FUM"
        }
    end
end
