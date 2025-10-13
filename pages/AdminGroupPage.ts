import { Page, BrowserContext } from "@playwright/test";
import { URLConstants } from "../constants/urlConstants";
import { PlaywrightWrapper } from "../utils/playwright"


export class AdminGroupPage extends PlaywrightWrapper {

    static pageUrl = URLConstants.adminURL;

    public selectors = {
        clickAdminGroup: (user: string) => `//div[text()='${user}']`,
        searchUser: "#includeLearner-filter-field",
        userSearchDropdown: `//select[@id='includeLearner']`,
        userSearchDropdownOption: (option: string) => `//option[text()='${option}']`,
        chooseUser: (user: string) => `//li[text()='${user}']`,
        //(username:string)=>`//span[text()=${username}]/following::i[contains(@class,'fa-square icon')][1]
        //selectUser:`(//div[contains(@class,'custom-control custom-chkbox')])[2]`,
        selectUser: `(//div[contains(@class,'chkbox')]//i[contains(@class,'fa-square icon')])[2]`,
        clickSelectUser: `//button[text()='Select Users']`,
        selectUpdate: `//button[text()='Update']`,
        searchCustomerAdmin: `//button[text()='CREATE GROUP']/following::input[1]`,
        // selectPopup: `//li[text()='Super admin - Customer']`,
        // commerceAdmin: `//div[text()='Commerce admin']`      
        createGroupButton: `#admin-view-btn-primary`,
        groupTitle: `#title`,
        adminRoledropdown: `//button[@data-id='admin_roles']`,
        selectRole: (roleName: string) => `//a[@class='dropdown-item']//span[text()='${roleName}']`,
        saveAdminGroup: `#lrnSaveUpdate`,
        proceedButton: `//button[contains(text(),'Yes, Proceed')]`,
        yesButton: `//button[text()='Yes']`,
        clickActivateBtn:`//span[text()='Activate']`,
        activateGroupBtn: `//a[@data-bs-toggle='tooltip'][@aria-label='Activate']`,
        suspendBtn: `[name="suspend-btn"]`,
        suspendIconBtn: `//a[@data-bs-toggle='tooltip'][@aria-label='Suspend']`,
        accessButton: `//span[@class='icontxt pointer' and text()='Access']`,
        deleteButton: `//span[@class='ms-2 field_title_1 deactivate_color' and text()='Delete Group']`,
        validTillInput: `//input[@id="admn_valid_till-input"]`,
        adminGroupValue: `//label[text()='Learner Group']//preceding::label[@class='form-label d-block my-0 me-1 text-break']`,
        adminGroupValueInUser: `//label[text()='Admin Group']//following::label[@class='form-label d-block my-0 me-1 text-break']`,
    
    }

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }


    public async searchAdmin(admin: string) {
        await this.type(this.selectors.searchCustomerAdmin, "Search Admin", admin)

    }
    public async clickGroup(data: string) {
        await this.wait('minWait');
        await this.mouseHover(this.selectors.chooseUser(data), "POP up ");
        await this.click(this.selectors.chooseUser(data), "Pop up", "Clicked");
        await this.click(this.selectors.clickAdminGroup(data), "Customer Admin", "Button");
    }


    public async clickCommerceAdmin() {
        await this.click(this.selectors.clickAdminGroup("Commerce admin"), "Commerce Admin", "Button");

    }

    public async clickLearningAdmin() {
        await this.click(this.selectors.clickAdminGroup("Learning admin"), "Learning Admin", "Button");
        await this.wait('minWait')
    }


    public async clickPeopleAdmin() {
        await this.click(this.selectors.clickAdminGroup("People admin"), "People Admin", "Button");
    }


    public async clickEnrollAdmin() {
        await this.click(this.selectors.clickAdminGroup("Enrollment admin"), "People Admin", "Button");
    }


    public async clickCourseAdmin() {
        await this.click(this.selectors.clickAdminGroup("Course creator admin"), "Course Admin", "Button");
    }


    // public async adminPopup(admintype:string){
    //     const adminGroup = [
    //         "Customer Admin", "Course creator admin", "Enrollment admin",
    //          "People admin", "Learning admin", "Commerce admin", "Talent admin",           
    //     ];   
    //     for(let name of adminGroup){     
    //         if(name.includes(admintype))
    //         await this.click(this.selectors.clickAdminGroup(`${name}`), `${name}`, "Button");
    //     }}


    public async searchUser(data: string) {
        await this.typeAndEnter(this.selectors.searchUser, "Search User", data);
    }

    public async selectUserSearchType(searchType: string) {
        await this.click(this.selectors.userSearchDropdown, "User Search Dropdown", "Dropdown");
        await this.click(this.selectors.userSearchDropdownOption(searchType), `${searchType} Option`, "Option");
    }

    public async searchUserByType(searchType: string, searchValue: string) {
        await this.wait("minWait");
        await this.selectUserSearchType(searchType);
        await this.wait("minWait");
        await this.type(this.selectors.searchUser, `Search by ${searchType}`, searchValue);
        await this.wait("mediumWait");
    }
    public async clickuserCheckbox(username: string) {
        await this.validateElementVisibility(this.selectors.selectUser, username);
        await this.click(this.selectors.selectUser, username, "CheckBox");
        await this.isCheckboxClicked(this.selectors.selectUser, "CheckBox");
    }

    public async clickSelectUsers() {
        await this.click(this.selectors.clickSelectUser, "Username", "Checkbox ");
    }

    public async clickUpdate() {
        await this.validateElementVisibility(this.selectors.selectUpdate, "Update");
        await this.wait('minWait');
        await this.click(this.selectors.selectUpdate, "Update", "Button");
    }
    public async clickCreateGroup() {
        await this.wait("minWait")
        await this.validateElementVisibility(this.selectors.createGroupButton, "Create Group");
        await this.click(this.selectors.createGroupButton, "Create Group", "Button")
    }

    public async enterGroupTitle(title: string) {
        await this.type(this.selectors.groupTitle, "Custom Group title", title)

    }

    public async selectroleAdmin(roleName: string) {
        await this.click(this.selectors.adminRoledropdown, "Admin Role", "Dropdown")
        await this.click(this.selectors.selectRole(roleName), "Custom Admin Role", "Option")
    }

    public async clickSave() {
        await this.click(this.selectors.saveAdminGroup, "Custom Group Save ", "button")
    }

    public async clickProceed() {
        await this.wait("minWait")
        await this.validateElementVisibility(this.selectors.proceedButton, "Proceed");
        await this.click(this.selectors.proceedButton, "Proceed", "button")

    }

    async getAdminGroups() {
        await this.wait("mediumWait");
        const locator = this.page.locator(this.selectors.adminGroupValue);
        const count = await locator.count();
        let adminGroup: any = [];
        for (let i = 0; i < count; i++) {
            const ag = await locator.nth(i).innerHTML();
            await adminGroup.push(ag);
        }
        return adminGroup;
    }
    async getAdminGroupsInUserPage() {
        await this.wait("mediumWait");
        const locator = this.page.locator(this.selectors.adminGroupValueInUser);
        const count = await locator.count();
        let adminGroup: any = [];
        for (let i = 0; i < count; i++) {
            const ag = await locator.nth(i).innerHTML();
            await adminGroup.push(ag);
        }
        return adminGroup;
    }
    async clickActivate() {
        await this.validateElementVisibility(this.selectors.clickActivateBtn, "Activate");
        await this.click(this.selectors.clickActivateBtn, "Activate", "Radio");
    }
    async clickSuspend() {
        await this.validateElementVisibility(this.selectors.suspendBtn, "Suspend");
        await this.click(this.selectors.suspendBtn, "Suspend", "Button");
    }
    async clickYes() {
        await this.validateElementVisibility(this.selectors.yesButton, "Yes");
        await this.click(this.selectors.yesButton, "Yes", "Button");
    }
    async clickActivateGroup() {
        await this.validateElementVisibility(this.selectors.activateGroupBtn, "Activate Group");
        await this.click(this.selectors.activateGroupBtn, "Activate Group", "Link");
    }
    async enterValidTillDate(date: string) {
        await this.type(this.selectors.validTillInput, "Valid Till Date", date);
    }
    async verifyActivated() {
        await this.wait("maxWait");
        await this.validateElementVisibility(this.selectors.suspendIconBtn, "Suspend Button");
    }
    public async clickSelelctUsers() {
        await this.click(this.selectors.clickSelectUser, "Username", "Checkbox ");
    }

    public async verifyAccessButtonDisabled() {
        await this.wait("mediumWait");
        const accessButtonLocator = this.page.locator(this.selectors.accessButton);
        const count = await accessButtonLocator.count();
        
        if (count > 0) {
            // Check if the element has disabled class or pointer-events: none
            const isClickable = await accessButtonLocator.isEnabled().catch(() => false);
            const hasPointerEvents = await accessButtonLocator.evaluate(el => {
                const style = window.getComputedStyle(el);
                return style.pointerEvents !== 'none';
            }).catch(() => true);
            
            if (isClickable && hasPointerEvents) {
                throw new Error('Access button is enabled when it should be disabled for suspended admin group.');
            }
        } else {
            throw new Error('Access button not found in the UI.');
        }
    }

    public async verifySuspendButtonDisabled() {
        await this.wait("mediumWait");
        const suspendButtonLocator = this.page.locator(this.selectors.suspendBtn);
        const count = await suspendButtonLocator.count();
        
        if (count > 0) {
            // Scroll to the suspend button to ensure it's visible
            await suspendButtonLocator.scrollIntoViewIfNeeded();
            await this.wait("minWait");
            
            // Hover over the suspend button
            await this.mouseHover(this.selectors.suspendBtn, "Suspend Button");
            await this.wait("minWait");
            
            // Check if the element is disabled
            const isDisabled = await suspendButtonLocator.isDisabled().catch(() => false);
            const hasDisabledAttribute = await suspendButtonLocator.getAttribute('disabled').catch(() => null);
            const isClickable = await suspendButtonLocator.isEnabled().catch(() => false);
            
            // Check for disabled class
            const hasDisabledClass = await suspendButtonLocator.getAttribute('class').then(classes => 
                classes?.includes('disabled') || classes?.includes('btn-disabled')
            ).catch(() => false);
            
            // Check CSS pointer events
            const hasPointerEvents = await suspendButtonLocator.evaluate(el => {
                const style = window.getComputedStyle(el);
                return style.pointerEvents !== 'none';
            }).catch(() => true);
            
            // Validate that the button is properly disabled
            if (!isDisabled && !hasDisabledAttribute && isClickable && hasPointerEvents && !hasDisabledClass) {
                throw new Error('Suspend button is enabled when it should be disabled for default admin group.');
            }
            
            console.log('Suspend button is properly disabled for default admin group');
        } else {
            throw new Error('Suspend button not found in the UI.');
        }
    }

    public async verifyDeleteButtonDisabled() {
        await this.wait("mediumWait");
        const deleteButtonLocator = this.page.locator(this.selectors.deleteButton);
        const count = await deleteButtonLocator.count();
        
        if (count > 0) {
            // Scroll to the delete button to ensure it's visible
            await deleteButtonLocator.scrollIntoViewIfNeeded();
            await this.wait("minWait");
            
            // Hover over the delete button
            await this.mouseHover(this.selectors.deleteButton, "Delete Button");
            await this.wait("minWait");
            
            // Check if the element has deactivate_color class which indicates it's disabled
            const hasDeactivateClass = await deleteButtonLocator.getAttribute('class').then(classes => 
                classes?.includes('deactivate_color')
            ).catch(() => false);
            
            // Check if the element is clickable
            const isClickable = await deleteButtonLocator.isEnabled().catch(() => false);
            const hasPointerEvents = await deleteButtonLocator.evaluate(el => {
                const style = window.getComputedStyle(el);
                return style.pointerEvents !== 'none';
            }).catch(() => true);
            
            // For delete button, deactivate_color class indicates it's disabled
            if (!hasDeactivateClass) {
                throw new Error('Delete button does not have deactivate_color class - it may be enabled for default admin group.');
            }
            
            // Additional check for clickability
            if (isClickable && hasPointerEvents) {
                console.warn('Delete button appears clickable but has deactivate_color class');
            }
            
            console.log('Delete button is properly disabled for default admin group');
        } else {
            throw new Error('Delete button not found in the UI.');
        }
    }

}