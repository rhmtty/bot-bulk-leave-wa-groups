const puppeteer = require('puppeteer');

(async () => {
    let repeat = 200;
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://web.whatsapp.com');

    console.log('Please scan the QR code within the next 30 seconds.');
    await new Promise(resolve => setTimeout(resolve, 30000)); // Wait for the user to scan the QR code

    const groupName = 'PG TriPay'; // Replace with your actual group name

    try {
        do {
            // Search for the group
            await page.waitForSelector('div[contenteditable="true"]');
            await page.type('div[contenteditable="true"]', groupName);
            await page.keyboard.press('Enter');
            await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for search results

            // Click on the group
            await page.evaluate((groupName) => {
                let groups = document.querySelectorAll('span[title]');
                for (let group of groups) {
                    if (group.title === groupName) {
                        group.click();
                        break;
                    } else {
                        repeat = 0
                        break
                    }
                }
            }, groupName);
            await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for group info to load

            // Click on the group info button
            await page.click('header[class="_amid"]');
            await new Promise(resolve => setTimeout(resolve, 3000)); // Wait for group info to load

            // Scroll down to the 'Exit group' button
            await page.evaluate(() => {
                let menuButton = document.querySelector('div[class="_alzb  _alzo"]');
                if (menuButton) {
                    menuButton.click();
                } else {
                    console.log('Menu button not found.');
                }
            });
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for exit options to load

            // Click on 'Exit group'
            await page.evaluate(() => {
                // let exitButton = Array.from(document.querySelectorAll('div[role="button"]')).find(button => button.innerText === 'Exit group');
                let exitButton = Array.from(document.querySelectorAll('div[class="x1c4vz4f xs83m0k xdl72j9 x1g77sc7 x78zum5 xozqiw3 x1oa3qoh x12fk4p8 x3pnbk8 xfex06f xeuugli x2lwn1j xl56j7k x1q0g3np x6s0dn4"]')).find(button => button.innerText === 'Exit group');
                if (exitButton) {
                    exitButton.click();
                } else {
                    console.log('Exit group button not found.');
                }
            });
            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for confirmation options to load

            // Now delete the group
            await page.evaluate(() => {
                // let deleteButton = Array.from(document.querySelectorAll('div[role="button"]')).find(button => button.innerText === 'Delete group');
                let deleteButton = Array.from(document.querySelectorAll('span[class="x1lkfr7t xdbd6k5 x1fcty0u xwc7gll"]')).find(button => button.innerText === 'Delete group');
                if (deleteButton) {
                    deleteButton.click();
                } else {
                    console.log('Delete group button not found.');
                }
            });

            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for confirmation options to load

            // Confirm 'Delete group'
            await page.evaluate(() => {
                // let confirmButton = Array.from(document.querySelectorAll('div[role="button"]')).find(button => button.innerText === 'Delete');
                let confirmButton = Array.from(document.querySelectorAll('div[class="x1c4vz4f xs83m0k xdl72j9 x1g77sc7 x78zum5 xozqiw3 x1oa3qoh x12fk4p8 x3pnbk8 xfex06f xeuugli x2lwn1j xl56j7k x1q0g3np x6s0dn4"]')).find(button => button.innerText === 'Delete group');
                if (confirmButton) {
                    confirmButton.click();
                } else {
                    console.log('Confirm delete button not found.');
                }
            });

            await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for confirmation options to load

            repeat--
            console.log(`${repeat}. Group exited and deleted successfully.`);
            const searchInp = await page.$('div[contenteditable="true"]')
            await searchInp.click({ clickCount: 3 })
            await page.keyboard.press('Backspace')
            await new Promise(resolve => setTimeout(resolve, 2500)); // Wait for confirmation options to load
        } while (repeat > 1); // Change to `true` if you want to repeat the process
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
    }
})();
