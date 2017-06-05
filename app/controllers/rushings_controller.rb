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
        if params.has_key?(:sortby) && Rushing.has_attribute?(params[:sortby]) && params.has_key?(:order)
            unless params[:sortby] == "longest_rush"
                rushings.order!(params[:sortby] + (params[:order] == 'desc' ? ' DESC' : ' ASC'))
            else
                # Need to convert to integer for longest rush since it is a string with a number
                rushings = rushings.sort do |a, b|
                    a = a.longest_rush.to_i
                    b = b.longest_rush.to_i
                    (a <=> b) * (params[:order] == 'desc' ? -1 : 1)
                end
            end
        end

        csv_string = CSV.generate do |csv|
            csv << stat_names.values
            rushings.each do |rushing|
                csv << stat_names.keys.map { |column| rushing[column] }
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
