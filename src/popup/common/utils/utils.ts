export async function getActiveTab(){
    let tabs = await browser.tabs.query({ active: true, currentWindow: true })
    const activeTab = tabs[0];
    return activeTab;
}