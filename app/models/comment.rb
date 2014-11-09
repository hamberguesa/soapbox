class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :splash

  before_save :inherit_from_author

  private
  def inherit_from_author
    if self.user
      self.author_name = "#{self.user.first_name} #{self.user.last_name}"
    end
  end


end
