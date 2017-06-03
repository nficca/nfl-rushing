class RushingsController < ApplicationController
    def index
        @rushings = Rushing.all
    end
end
