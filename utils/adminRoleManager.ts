import { AdminRolePage } from "../pages/AdminRole";
import { AdminHomePage } from "../pages/AdminHomePage";
import { getItemByProperty } from "./jsonDataHandler";

/**
 * Utility class for managing admin roles in tests
 * Provides functions to check if roles exist and create them only if needed
 */
export class AdminRoleManager {
    
    /**
     * Check if admin role exists in the UI
     * @param adminRoleHome - AdminRolePage instance
     * @param roleName - Name of the role to check
     * @returns Promise<boolean> - true if role exists, false otherwise
     */
    static async checkRoleExists(adminRoleHome: AdminRolePage, roleName: string): Promise<boolean> {
        try {
            // Use the existing roleSearch method to search for the role
            await adminRoleHome.roleSearch(roleName);
            
            // Wait a moment for search results to load
            await adminRoleHome.page.waitForTimeout(3000);
            
            // Check for "no results" message
            const noResultsExists = await adminRoleHome.page.locator('text=There are no results that match your current filters').isVisible();
            if (noResultsExists) {
                console.log(`Role '${roleName}' not found - no search results`);
                return false;
            }
            
            // If no "no results" message, try to verify the role exists
            await adminRoleHome.verifyRole(roleName);
            return true;
        } catch (error) {
            // If search or verify fails, role doesn't exist
            console.log(`Role '${roleName}' not found in UI:`, error);
            return false;
        }
    }

    /**
     * Create admin role with specified privileges if it doesn't exist
     * @param adminHome - AdminHomePage instance
     * @param adminRoleHome - AdminRolePage instance  
     * @param roleData - Role data object with name, description, and privileges
     */
    static async ensureRoleExists(adminHome: AdminHomePage, adminRoleHome: AdminRolePage, roleData: any): Promise<void> {
        // Navigate to admin roles page
        await adminHome.menuButton();
        await adminHome.people();
        await adminHome.clickAdminRole();

        // Check if role already exists
        const exists = await this.checkRoleExists(adminRoleHome, roleData.roleName);
        
        if (!exists) {
            console.log(`Creating admin role: ${roleData.roleName}`);
            
            // Create the role
            await adminRoleHome.clickAddAdminRole();
            await adminRoleHome.enterName(roleData.roleName);
            
            // Add privileges (using the available method)
            await adminRoleHome.clickAllPriveileges();
            
            // Save the role
            await adminRoleHome.clickSave();
            
            // Verify role was created
            await adminRoleHome.verifyRole(roleData.roleName);
            console.log(`Successfully created admin role: ${roleData.roleName}`);
        } else {
            console.log(`Admin role '${roleData.roleName}' already exists, skipping creation`);
        }
    }

    /**
     * Get predefined role data by test type from JSON file
     * @param testType - Type of test (basic, advanced, manager, search, filter)
     * @returns Promise<any> - Role data object
     */
    static async getRoleDataByType(testType: string): Promise<any> {
        const role = getItemByProperty("./data/MetadataLibraryData/Production/predefinedAdminRoles.json", "testType", testType);
        
        if (!role) {
            throw new Error(`No predefined role found for test type: ${testType}`);
        }
        
        return role;
    }

    /**
     * Setup multiple admin roles for comprehensive testing
     * @param adminHome - AdminHomePage instance
     * @param adminRoleHome - AdminRolePage instance
     * @param testTypes - Array of test types to setup roles for
     */
    static async setupMultipleRoles(adminHome: AdminHomePage, adminRoleHome: AdminRolePage, testTypes: string[]): Promise<void> {
        await adminHome.loadAndLogin("CUSTOMERADMIN");
        
        for (const testType of testTypes) {
            try {
                const roleData = await this.getRoleDataByType(testType);
                await this.ensureRoleExists(adminHome, adminRoleHome, roleData);
            } catch (error) {
                console.error(`Error setting up role for test type '${testType}':`, error);
            }
        }
    }

    /**
     * Store created role data in predefined JSON for cross-test usage
     * @param roleName - Name of the created role
     * @param description - Description of the role
     * @param testType - Test type identifier for retrieval
     */
    static async storeCreatedRole(roleName: string, description: string = "Custom admin role with all privileges", testType: string = "ag009_created"): Promise<void> {
        const fs = require('fs');
        const rolesPath = './data/MetadataLibraryData/QA/predefinedAdminRoles.json';
        
        try {
            const roles = JSON.parse(fs.readFileSync(rolesPath, 'utf8'));
            
            const newRole = {
                "roleName": roleName,
                "description": description,
                "privileges": ["ALL"],
                "testType": testType,
                "isActive": true
            };
            
            // Add to roles if not already exists
            const exists = roles.find((role: any) => role.roleName === roleName);
            if (!exists) {
                roles.push(newRole);
                fs.writeFileSync(rolesPath, JSON.stringify(roles, null, 4));
                console.log(`Role '${roleName}' stored in predefined roles`);
            }
        } catch (error) {
            console.error(`Error storing role '${roleName}':`, error);
        }
    }
}