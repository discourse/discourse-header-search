RSpec.describe "header search keyboard shortcut", system: true do
  let!(:theme) { upload_theme_component }

  it "focusses search header when keyboard shortcut used" do
    visit("/")
    expect(page).to have_css("#search-term", focused: false)
    find("body").send_keys("/")
    expect(page).to have_css("#search-term", focused: true)
  end
end
