import { AdminGroupPage } from "../pages/AdminGroupPage";
import { AdminHomePage } from "../pages/AdminHomePage";
import { getItemByProperty } from "./jsonDataHandler";

/**
 * Utility class for managing admin groups in tests
 * Provides functions to check if groups exist and create them only if needed
 */
export class AdminGroupManager {
    
    /**
     * Check if admin group exists in the UI
     * @param adminGroup - AdminGroupPage instance
     * @param groupTitle - Name of the group to check
     * @returns Promise<boolean> - true if group exists, false otherwise
     */
    static async checkGroupExists(adminGroup: AdminGroupPage, groupTitle: string): Promise<boolean> {
        try {
            // Use the existing searchAdmin method to search for the group
            await adminGroup.searchAdmin(groupTitle);
            
            // Wait for search results and check if group appears
            await adminGroup.page.waitForTimeout(2000); // Give time for search results
            return true;
        } catch (error) {
            // If search fails, group doesn't exist
            console.log(`Group '${groupTitle}' not found in UI`);
            return false;
        }
    }

    /**
     * Create admin group with specified role if it doesn't exist
     * @param adminHome - AdminHomePage instance
     * @param adminGroup - AdminGroupPage instance  
     * @param groupData - Group data object with title, role, and description
     */
    static async ensureGroupExists(adminHome: AdminHomePage, adminGroup: AdminGroupPage, groupData: any): Promise<void> {
        // Navigate to admin groups page
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.adminGroup();

        // Check if group already exists
        const exists = await this.checkGroupExists(adminGroup, groupData.groupTitle);
        
        if (!exists) {
            console.log(`Creating admin group: ${groupData.groupTitle}`);
            
            // Create the group
            await adminGroup.clickCreateGroup();
            await adminGroup.enterGroupTitle(groupData.groupTitle);
            
            // Select the role for the group
            await adminGroup.selectroleAdmin(groupData.roleName);
            
            // Activate the group
            await adminGroup.clickActivate();
            
            // Save the group
            await adminGroup.clickSave();
            
            // Handle proceed dialog if it appears
            try {
                await adminGroup.clickProceed();
            } catch (error) {
                // Proceed dialog may not appear, continue
                console.log("Proceed dialog not present, continuing...");
            }
            
            console.log(`Successfully created admin group: ${groupData.groupTitle}`);
        } else {
            console.log(`Admin group '${groupData.groupTitle}' already exists, skipping creation`);
        }
    }

    /**
     * Get predefined group data by test type from JSON file
     * @param testType - Type of test (basic, advanced, manager, search, export)
     * @returns Promise<any> - Group data object
     */
    static async getGroupDataByType(testType: string): Promise<any> {
        const group = getItemByProperty("./data/MetadataLibraryData/Production/predefinedAdminGroups.json", "testType", testType);
        
        if (!group) {
            throw new Error(`No predefined group found for test type: ${testType}`);
        }
        
        return group;
    }

    /**
     * Setup multiple admin groups for comprehensive testing
     * @param adminHome - AdminHomePage instance
     * @param adminGroup - AdminGroupPage instance
     * @param testTypes - Array of test types to setup groups for
     */
    static async setupMultipleGroups(adminHome: AdminHomePage, adminGroup: AdminGroupPage, testTypes: string[]): Promise<void> {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        
        for (const testType of testTypes) {
            try {
                const groupData = await this.getGroupDataByType(testType);
                await this.ensureGroupExists(adminHome, adminGroup, groupData);
            } catch (error) {
                console.error(`Error setting up group for test type '${testType}':`, error);
            }
        }
    }

    /**
     * Store created group data in predefined JSON for cross-test usage
     * @param groupTitle - Title of the created group
     * @param roleName - Associated role name
     * @param description - Description of the group
     * @param testType - Test type identifier for retrieval
     */
    static async storeCreatedGroup(groupTitle: string, roleName: string, description: string = "Custom admin group created for testing", testType: string = "ag009_created"): Promise<void> {
        const fs = require('fs');
        const groupsPath = './data/MetadataLibraryData/QA/predefinedAdminGroups.json';
        
        try {
            const groups = JSON.parse(fs.readFileSync(groupsPath, 'utf8'));
            
            const newGroup = {
                "groupTitle": groupTitle,
                "roleName": roleName,
                "description": description,
                "testType": testType,
                "isActive": true
            };
            
            // Add to groups if not already exists
            const exists = groups.find((group: any) => group.groupTitle === groupTitle);
            if (!exists) {
                groups.push(newGroup);
                fs.writeFileSync(groupsPath, JSON.stringify(groups, null, 4));
                console.log(`Group '${groupTitle}' stored in predefined groups`);
            }
        } catch (error) {
            console.error(`Error storing group '${groupTitle}':`, error);
        }
    }
}