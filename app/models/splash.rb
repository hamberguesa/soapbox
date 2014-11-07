class Splash < ActiveRecord::Base
  belongs_to :splish_splasher, :class_name => "User"
  has_many :comments

  has_many :puddles
  has_many :jumpers, through: :puddles

  before_save :inherit_location

  private
  def inherit_location

    # user = User.find(self.user_ids)
    # # puts "*"*50
    # # puts "USER: #{self.user_ids}"
    # # puts "*"*50
    # # puts user.longitude
    # self.latitude = user.latitude
    # self.longitude = user.longitude
  end

end
