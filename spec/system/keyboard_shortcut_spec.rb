# frozen_string_literal: true

RSpec.describe "header search keyboard shortcut" do
  before { upload_theme_component }

  it "focuses search header when keyboard shortcut used" do
    visit("/")
    expect(page).to have_css(".search-term__input", focused: false)
    find("body").send_keys("/")
    expect(page).to have_css(".search-term__input", focused: true)
  end
end
