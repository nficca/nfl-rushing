class RushingsController < ApplicationController
    def index
        @rushings = Rushing.all
        @stats = stat_names
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
