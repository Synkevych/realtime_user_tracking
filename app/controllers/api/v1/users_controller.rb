require 'random_name_generator'

module Api
  module V1
    class UsersController < ApplicationController
      protect_from_forgery with: :null_session
      before_action :authenticate!

      def index
        users = User.all
        .filter_by_last_seen
        .paginate(page: params[:page])

        render json: UserSerializer.new(users).serialized_json
      end
      
      def show
        user = User.find_by(id: params[:id])

        render json: UserSerializer.new(user).serialized_json
      end
      
      def create
        user = User.new(user_params)

        if user.save
          render json: UserSerializer.new(user).serialized_json
        else
          render json: { error: user.errors.messages }, status: 422
        end
      end

      private

      def user_params
        params.require(:user).permit(:name, :ip_address, :device)
      end

      def authenticate!
        current_user = User.find_by(ip_address: ip_addr, device: device_name)
        
        if current_user.present?
          current_user.refresh_activity
        else
          current_user = User.create(name: user_name, device: device_name, ip_address: ip_addr)
        end
        session['user_id'] = current_user.id
      end

      def device_name
        agent = request.user_agent
        return "tablet" if agent =~ /(tablet|ipad)|(android(?!.*mobile))/i
        return "mobile" if agent =~ /Mobile/
        return "desktop"
      end

      def ip_addr
        request.remote_ip == "::1" ? "192.168.0.1" : request.remote_ip.to_s
      end

      def user_name
        RandomNameGenerator.new(RandomNameGenerator::GOBLIN).compose(2)
      end

    end
  end
end
