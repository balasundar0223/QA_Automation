import { Page, BrowserContext } from "@playwright/test";
import { AdminHomePage } from "./AdminHomePage";
import { FakerData } from "../utils/fakerUtils";
<<<<<<< HEAD
import { th } from "@faker-js/faker";
=======
>>>>>>> origin/master

export class OrganizationPage extends AdminHomePage {

    public selectors = {
        ...this.selectors,
        menu: "//div[text()='Menu']",
        peopleMenu: "//span[text()='People']",
        organizationSubMenu: "//a[text()='Organization']",
        create: "//button[@id='admin-view-btn-primary']",
        enterName: "//input[@id='Name']",
        selectTab: "//label[text()='Type']//following::div[@id='wrapper-Type']",
<<<<<<< HEAD
        // selectType: (index: number) => `(//a[@class='dropdown-item']//span)[${index}]`,

        //  selectType: (index: number) =>    `(//a[contains(@id,'6-0')]/child::span)[${index}]`,

        selectType:(type:string)=>`//span[text()='${type}']`,


=======
        selectType: (index: number) => `(//a[@class='dropdown-item']//span)[${index}]`,
>>>>>>> origin/master
        description: "//div[@id='Description']//p",
        save: "//button[text()='Save']",
        editOrganization: `//a[text()='Edit Organization']`,
        contactName: `//input[@id='ContactName']`,
        updateBtn: `//button[text()='Update']`,
        orgeditIcon: `(//i[contains(@class,'fa-duotone fa-pen ')])[1]`,
        parentOrg: `//input[@id='ParentOrg-filter-field']`,
        selectParentOrg: `(//div[@id='ParentOrg-filter-results-container']//li)[1]`,
        childCount: (fieldName: string) => `//div[contains(text(),'${fieldName}')]/following::span[contains(text(),'Child Organizations')][1]`,
        //childCount: (fieldName: string) => `//div[text()='${fieldName}']/following::span[contains(text(),'Child Organizations')][1]`,
        loadMore: `//button[text()='Load More']`,
<<<<<<< HEAD

        clickCreateOrganizationBtn:`//a[text()='Create Organization']`,

        clickGotoListBtn:`//a[text()='Go to Listing']`,

        Orgname:`//div[@data-bs-toggle='tooltip']`,

       

        valueOfOgType:`(//label[text()='Type']/following::div[@class='filter-option-inner-inner'])[1]`,

        suspendIcon:`(//i[contains(@class,'fa-duotone fa-ban ')])[1]`,
        deleteIcon:`(//i[contains(@class,'fa-duotone fa-trash-can ')])[1]`,
        confirmationYes:`//button[text()='Yes']`,
        activeIcon:`(//i[contains(@class,'fa-duotone fa-circle-check ')])[1]`,

        suspendButton:`//button[text()='Suspend']`,

        confirmationOk:`//button[text()='OK']`,

        noResults:`//h3[contains(text(),'no results')]`,
        deleteButton:`deleteButton`,

        filterIcon:`//div[text()='Filters']`,

        checkOgtype:(orgType:string)=>`//span[text()='${orgType}']/preceding-sibling::i[@class='fa-duotone fa-square icon_14_1 me-1']`,

        checkStatus:(status:string)=>`//span[text()='${status}']/preceding-sibling::i[@class='fa-duotone fa-square icon_14_1 me-1']`,

        apply:`//button[text()='Apply']`,
        sort:`//div[@class='filter-option-inner-inner']`,
        allOptions:(option:string)=>`//span[text()='${option}']`,
                orgType:(data:string)=>`//span[text()='${data}']`,
        results:`//div[@id='ParentOrg-filter-lms-scroll-results']`,

        disabledDeleteIcon:`//i[@class='fa-duotone fa-trash-can icon_14_6 deactivate_color']`,

        threeDot:`//i[@class='fa fa-duotone fa-ellipsis icon_14_1 pointer']`,

        childOrgSuspendIcon:(parent:string,child:string)=>`((//div[text()='${parent}']/following::span[contains(text(),'Child Organizations')])[1]/following::span[text()='${child}']/following::i[@class='fa-duotone fa-ban icon_14_6 pointer'])[1]`,
        childOrgDeleteIcon:(parent:string,child:string)=>`((//div[text()='${parent}']/following::span[contains(text(),'Child Organizations')])[1]/following::span[text()='${child}']/following::i[@class='fa-duotone fa-trash-can icon_14_6'])[1]`,
        
        editChildOrg: (parent:string,child:string)=>`((//div[text()='${parent}']/following::span[contains(text(),'Child Organizations')])[1]/following::span[text()='${child}']/following::i[@class='fa-duotone fa-pen icon_14_1 pointer'])[1]`,
        
        disabledChildOrganization:`(//span[text()='Child Organizations:0'])[1]`,

        disabledCount:(parent:string,child:string)=>`((//div[text()='${parent}']/following::span[contains(text(),'Child Organizations')])[1]/following::span[text()='${child}']/following::span[@class='information_text deactivate_color'])[1]`,

        exportUsers:(parent:string)=>`(//div[text()='${parent}']/following::i[@aria-label='Export'])[1]`,

    exportFormat:(format:string)=>`//ul[contains(@class,'dropdown-menu dropdown-menu-end rounded-0 py-0 form-label border_4 show')]/li/button/span[text()='${format}']`,

    disabledUserCount:(parent:string)=>`(//div[text()='${parent}']/following::span[@class='information_text deactivate_color'])[1]`,

    costcenter:`//input[@id='CostCenter']`,

            hierarchyCount:(parent:string,child:string)=>`((//div[text()='${parent}']/following::span[contains(text(),'Child Organizations')])[1]/following::span[text()='${child}']/following::span[@class='information_text'])[1]`,

            clickChildOrganization:(parent:string,child:string)=>`((//div[text()='${parent}']/following::span[contains(text(),'Child Organizations')])[1]/following::span[text()='${child}'])[1]`,

        grandChild:(parent:string,child:string)=>`((//div[text()='${parent}']/following::span[contains(text(),'Child Organizations')])[1]/following::span[text()='${child}']/following::span[@class='ms-2 information_text'])[1]`,

        verifyWarningPopupWhenOrgHaveActiveUsersOrChildOrg:`//div[@class='align-items-center justify-content-center text-break information_text']/span`,

    typeOfOrg:(orgname:string)=>`//div[text()='${orgname}']`,
    
    access:`//span[text()='Access']`,

    userCountOfChildOrganization:(parent:string)=>`(//div[text()='${parent}']/following::span[contains(text(),'Child Organizations')])[1]/following::i[@class='fa-duotone fa-user icon_14_1 me-1']/parent::span/following-sibling::span[@class='information_text']`
    }
=======
        orgType:(data:string)=>`//span[text()='${data}']`,

          //edit organization
        editOrg:(data:string)=>`(//div[text()='${data}']//following::i[contains(@class,'fa-duotone fa-pen ')])[1]`,
        orgSearchField: "//input[@id='exp-search-field']",
        descriptionVerify:`//div[@id='Description']//p`,

        //create organization
        clickCreateOrg:`//a[text()='Create Organization']`
    };
>>>>>>> origin/master

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
    }

    public async menuButton() {
        await this.page.waitForLoadState('load');
        await this.spinnerDisappear();
        await this.mouseHover(this.selectors.menu, "Menu");
        await this.click(this.selectors.menu, "Menu", "Button");
    }

    public async people() {
        await this.validateElementVisibility(this.selectors.peopleMenu, "People");
        await this.click(this.selectors.peopleMenu, "People", "Button");
    }

    public async organizationMenu() {
        await this.click(this.selectors.organizationSubMenu, "Organization", "Link");
    }

    public async createOrganization() {
<<<<<<< HEAD
        await this.validateElementVisibility(this.selectors.create, "Create Organization");
        await this.wait("minWait");
        await this.click(this.selectors.create, "Create Organization", "Button");
    }
=======
        await this.wait("minWait")
        await this.validateElementVisibility(this.selectors.create, "Create Organization");
        await this.click(this.selectors.create, "Create Organization", "Button");
    }
      public async clickCreateOrganization() {
        await this.validateElementVisibility(this.selectors.clickCreateOrg, "Create Organization");
        await this.click(this.selectors.clickCreateOrg, "Create Organization", "Button");
    }
>>>>>>> origin/master

    public async enterName(orgName: string) {
        await this.type(this.selectors.enterName, "Name", orgName);
    }

<<<<<<< HEAD
    public async typeDropdown(type:string) {
        await this.click(this.selectors.selectTab, "Select", "Dropdown");
        // const count = await this.page.locator("//a[@class='dropdown-item']//span").count()
        
        const count = await this.page.locator("(//div[text()='Select'])[1]").count()

        this.wait("minWait");
        const randomIndex = Math.floor(Math.random() * count) + 1;

        await this.click(this.selectors.selectType(type), "Type", "dropdown");


    }
=======
    // public async typeDropdown() {
    //     await this.click(this.selectors.selectTab, "Select", "Dropdown");
    //     const count = await this.page.locator("//a[@class='dropdown-item']//span").count()
    //     const randomIndex = Math.floor(Math.random() * count) + 1;
    //     await this.click(this.selectors.selectType(randomIndex), "Type", "dropdown");
    // }

    public async selectOrgType(orgTypeData: string) {
         await this.click(this.selectors.selectTab, "Select", "Dropdown");
         await this.click(this.selectors.orgType(orgTypeData), "Select", "Dropdown");
         }

>>>>>>> origin/master
    public async typeDescription() {
        await this.type(this.selectors.description, "Textbox", FakerData.getDescription());
    }

    public async clickSave() {
        await this.click(this.selectors.save, "Save", "Button")
<<<<<<< HEAD

=======
>>>>>>> origin/master
    }

    public async clickEditOrg() {
        await this.click(this.selectors.editOrganization, "Edit ", "Button")
    }
    public async clickEditIcon() {
        await this.click(this.selectors.orgeditIcon, "Edit ", "Icon")
    }
    public async childOrgCount(fdname: string) {
        for (let i = 0; i <= 1; i++) {
            await this.click(this.selectors.loadMore, "LoadMore", "Button")
            await this.wait("minWait")
        }
        const org = await this.getInnerText(this.selectors.childCount(fdname));
        console.log(org)
        let orgName = org.split(":").at(1)
        return parseInt(orgName)
    }
    public async enterParentOrg(orgName: string) {
        await this.keyboardType(this.selectors.parentOrg, orgName)
        await this.validateElementVisibility(this.selectors.selectParentOrg, "parentOrgName")
        await this.click(this.selectors.selectParentOrg, "parentOrgName", "Option")

    }
    public async enterContactName() {
        await this.wait("minWait");
        await this.validateElementVisibility(this.selectors.contactName, "ContactName");
        await this.type(this.selectors.contactName, "ContactName", FakerData.getFirstName());
    }
    public async clickUpdate() {
        await this.click(this.selectors.updateBtn, "Update", "Button")
    }

<<<<<<< HEAD
    public async clickCreateOrganizationButtoon(){
        await this.wait("minWait");
        await this.click(this.selectors.clickCreateOrganizationBtn,"Create Organization","Button")
    }

    async clickGotoList(){
        await this.click(this.selectors.clickGotoListBtn,"Gotolist","button")
    }

    async verifyTheOrgName(expected:string){
        this.wait("minWait");
        await this.verification(this.selectors.Orgname,expected)
    }


     

        async clickOrganizationEditIcon(orgName:string){
            await this.click(this.selectors.clickEditIconOfCreatedOrganization(orgName),"Edit Icon","Icon") 
         }

         async valueOfOrganizationType(){
            await this.wait("maxWait");
            const text=await this.page.locator(this.selectors.valueOfOgType).innerText();
            return text;
                 }


        public async clickSuspendIcon() {
        await this.click(this.selectors.suspendIcon, "suspend ", "Icon")
                await this.click(this.selectors.confirmationYes, "Yes", "Button")

    }

async verifyAndActiveSuspendedOrganization(){

    await this.wait("minWait");
   const isVisibleActiveIcon = await this.page.locator(this.selectors.activeIcon).isVisible();

    if (isVisibleActiveIcon){ {
        console.log("The organization is suspended successfully and Active icon is visible");
        this.click(this.selectors.activeIcon,"Active Icon","Icon");

        
    }
    
}}


async verifyTheDeletedorganization(){
await this.wait("minWait");
const noResultsText=await this.page.locator(this.selectors.noResults).isVisible();;
if (noResultsText) {
    console.log("The organization is deleted successfully and no results found message is visible");
    
}

}

        public async clickDeleteIcon() {
        await this.click(this.selectors.deleteIcon, "delete ", "Icon")
        await this.click(this.selectors.confirmationYes, "Yes", "Button")
    }

    async suspendFromDetailsPage(){
        await this.wait("minWait");
        await this.click(this.selectors.suspendButton, "suspend ", "button")
                await this.wait("minWait");

        await this.click(this.selectors.confirmationOk, "Ok", "Button");

    }

    async deleteFromDetailsPage(){
         await this.click(this.selectors.deleteButton, "delete ", "button")
        await this.click(this.selectors.confirmationOk, "Ok", "Button");

    }

    async clickFilterIcon(){
        await this.click(this.selectors.filterIcon,"Filter Icon","Icon")
    }

    async checkOrganizationTypeAndStatus(orgType:string,status:string){
        await this.click(this.selectors.checkOgtype(orgType),"OgType","checkbox");
        await this.click(this.selectors.checkStatus(status),"OgType","checkbox");
        await this.click(this.selectors.apply,"Apply","Button")


}


async clickSort(){
    await this.click(this.selectors.sort,"Sort","field");

}

// async checkAllOptionsInSort(){

//   const dropdownField = this.page.locator(this.selectors.sort);
// const options = ['A-Z', 'Z-A', 'New-Old', 'Old-New'];

// for (let index = 0; index < options.length; index++) {
//   await this.click(this.selectors.dropdownField,"click","Dropdown");
//   await this.wait("minWait");
//   await this.click(this.selectors.allOptions(options),"click","Dropdown");
// }


// }

 public async selectOrgType(orgTypeData: string) {
         await this.click(this.selectors.selectTab, "Select", "Dropdown");
         await this.click(this.selectors.orgType(orgTypeData), "Select", "Dropdown");
         }

   async verifyTheDeleteIconIsDisabled(){
    if(await this.page.locator(this.selectors.disabledDeleteIcon).isVisible()){
        console.log("The delete icon is disabled as the organization is mapped to the user/have child organization");
    }
    else{
        console.log("The delete icon is enabled even though the organization is mapped to the user/have child organization");
        
    }
   }

   async verifyTheDeleteIconIsDisabledInChildOrg(parent:string,child:string){
    if(await this.page.locator(this.selectors.childOrgDeleteIcon(parent,child)).isVisible()){
        console.log("The delete icon is enabled even though the child organization is mapped to the user/have child organization");
    }
    else{
        console.log("The delete icon is disabled as the child organization is mapped to the user/have child organization");
        
    }
   }

   async clickChildOrganization(fdname: string){
    await this.click(this.selectors.childCount(fdname),"Child Organization","Icon");
   }

   

   async clickThreedot(){
    await this.click(this.selectors.threeDot,"Load More","Button");
 await this.wait("minWait");
   }

   async editChildOrganization(parent:string,child:string){
    await this.click(this.selectors.editChildOrg(parent,child),"Edit Child Org","Icon");
   }

   async clearParentOrg(){
    await this.page.locator(this.selectors.parentOrg).clear();
   }

   async verifyChildOrganizationIsRemovedFromParentOrg(){
    await this.wait("minWait");
    if (await this.page.locator(this.selectors.disabledChildOrganization).isVisible()) {
        console.log("The child organization is removed from the parent organization");
        
    }
    else{
        console.log("The child organization is not removed from the parent organization");
        
    }
   }






   async deleteChildOrganization(parent:string,child:string){
    
    if (await this.page.locator(this.selectors.disabledCount(parent,child)).isVisible()) {
       await this.click(this.selectors.childOrgDeleteIcon(parent,child),"delete ","Icon");
        await this.click(this.selectors.confirmationYes,"Yes","Button");    

    }
    else{
        await this.click(this.selectors.childOrgSuspendIcon,"suspend ","Icon");
        await this.click(this.selectors.confirmationYes,"Yes","Button");    
    }

   }


   async exportUsers(parent:string){
    this.wait("minWait");
     if (await this.page.locator(this.selectors.disabledUserCount(parent)).isVisible()) {
      console.log("This organization is not mapped with any user, so that export users option is disabled");
      

    }
    else{
        const allFormats = ['Export as CSV', 'Export as Excel'];
        for(let i=0;i<allFormats.length;i++){
            await this.click(this.selectors.exportUsers(parent),"export ","Icon");
            await this.click(this.selectors.exportFormat(allFormats[i]),"export ","Icon");
            await this.wait("mediumWait");
        }
   }
}


async enterCostCenter(value:string){
    await this.type(this.selectors.costcenter,"Cost Center",value)
        await this.wait("minWait");

}

async verifyGrandchildOrganizationIsAddedToChildOrg(parent:string,child:string,grandchild:string){
    await this.wait("minWait");
    await this.click(this.selectors.childCount(parent),"Child Organization","Icon");
    await this.wait("minWait");
    if( await this.page.locator(this.selectors.hierarchyCount(parent,child)).isVisible()){
        this.wait("minWait");
        await this.click(this.selectors.clickChildOrganization(parent,child),"Child Organization","Child Org");
        await this.verification(this.selectors.grandChild(parent,child),grandchild);

}
else{
    console.log("The grandchild organization is not added to the child organization");
    
}
}


async verifyTheActionIconWhenThereIsNoActiveUserAndChildOrganization(parent:string){
    if(await this.page.locator(this.selectors.disabledChildOrganization).isVisible() && await this.page.locator(this.selectors.disabledUserCount(parent)).isVisible()){
        console.log("The child organization action icon and active user action icon are disabled as there is no child organization and active users are not there for the organisation");
    }
    else{
        console.log("The child organization action icon and active user action icon are enabled as there is child organization and active users are there for the organisation");}
}



async verifyTheMappedUserGotUnMappedWhenSuspendingOrg(parent:string){
    await this.click(this.selectors.suspendIcon, "suspend ", "Icon");
    await this.verification(this.selectors.verifyWarningPopupWhenOrgHaveActiveUsersOrChildOrg,"organization will remove all users associated with it");
    await this.click(this.selectors.confirmationYes,"Yes","Button");
    if(await this.page.locator(this.selectors.disabledUserCount(parent)).isVisible()){
        console.log("The mapped user got unmapped when suspending the organization");

}
else{
    console.log("The mapped user did not get unmapped when suspending the organization");
}
}

async verifyTheChildOrgGotMovedToOneLevelUp(child:string){
        // click suspend (or the action that triggers move up confirmation)
        await this.click(this.selectors.suspendIcon, "suspend", "Icon");

        // wait for the warning popup to appear and verify its message
        await this.wait("minWait");
        await this.verification(this.selectors.verifyWarningPopupWhenOrgHaveActiveUsersOrChildOrg, "child organization move one level higher");

        // confirm the action
        await this.click(this.selectors.confirmationYes, "Yes", "Button");

        // give the application some time to perform the move and update the DOM
        await this.wait("mediumWait");

        const orgLocator = this.page.locator(this.selectors.typeOfOrg(child));
        try {
            // wait up to 5s for the element to become visible
            await orgLocator.waitFor({ state: 'visible', timeout: 5000 });
            console.log("The child organization got moved to one level up successfully");
            return true;
        } catch (err) {
            console.log("The child organization did not move to one level up");
            return false;
        }

    }


    async verifyTheAccessIconIsEnabledOnlyWhenOrganizationIsCreated(){
        try {
            if (await this.page.locator(this.selectors.access).isVisible()) {
                console.log("The access icon is now not showing while creating the organization");
            }
        } catch (error) {
                console.log("The access icon is now showing even before the organization is created");
            
        }
}

async visibilityOfAccessIcon(){

    try {
        if (await this.page.locator(this.selectors.access).isVisible()) {
            console.log("The access icon showing");
        }
    } catch (error) {
        console.log("The access icon is not showing");
    }

}
async userCountInOrganizationDetailsPage(parent:string){
    const userCount= this.page.locator(this.selectors.userCountOfChildOrganization(parent));
    if (userCount.isVisible()) {
        console.log("user count of the organization is "+await userCount.innerText());
       
    }
    else{
        console.log("No users are mapped to this organization");
    }
}

}
=======


       public async editOrganization(data:string) {
        await this.type(this.selectors.orgSearchField, "Search Field", data);
        await this.keyboardAction(this.selectors.orgSearchField, "Enter", "Search Field", data);
        await this.spinnerDisappear();
        await this.wait("minWait")
        await this.validateElementVisibility(this.selectors.editOrg(data), "Edit Organization");
        await this.click(this.selectors.editOrg(data), "Edit Organization", "Button");
        await this.wait("minWait")
    }
    //verifying edited organization after updated through API
    public async verifyingEditedOrganization(data:string) {
        await this.verification(this.selectors.descriptionVerify,data);
    }
}
>>>>>>> origin/master
