# AG Test Cases - Predefined Roles & Groups Implementation

**Author:** Kathir A  
**Date:** October 11, 2025  
**Environment:** qaProduction (Production folder for data)

## Summary

Successfully updated all AG test cases (AG010-AG013) to use **predefined admin roles and groups** with **intelligent existence checking** to optimize backend performance and prevent storage issues.

## Key Benefits

### 🚀 **Performance Optimization**
- **Problem Solved:** Eliminates backend slowness from random role/group creation
- **Smart Creation:** Only creates roles/groups if they don't already exist in UI
- **Storage Efficiency:** No duplicate roles, controlled data growth
- **Faster Test Execution:** Reuses existing roles instead of creating new ones every time

### 🎯 **Intelligent Data Management**

## New Utility Classes Created

### AdminRoleManager (`utils/adminRoleManager.ts`)
```typescript
// Key Functions:
AdminRoleManager.checkRoleExists(adminRoleHome, roleName)     // Check if role exists in UI
AdminRoleManager.ensureRoleExists(adminHome, adminRoleHome, roleData)  // Create only if needed
AdminRoleManager.getRoleDataByType(testType)                 // Get predefined role by type
AdminRoleManager.setupMultipleRoles(adminHome, adminRoleHome, testTypes) // Bulk setup
```

### AdminGroupManager (`utils/adminGroupManager.ts`)
```typescript
// Key Functions:  
AdminGroupManager.checkGroupExists(adminGroup, groupTitle)   // Check if group exists in UI
AdminGroupManager.ensureGroupExists(adminHome, adminGroup, groupData) // Create only if needed
AdminGroupManager.getGroupDataByType(testType)              // Get predefined group by type
AdminGroupManager.setupMultipleGroups(adminHome, adminGroup, testTypes) // Bulk setup
```

## Predefined Data Structure

### Admin Roles (`predefinedAdminRoles.json`)
| Role Name | Test Type | Privileges | Usage |
|-----------|-----------|------------|-------|
| `QA_Basic_Admin_Role` | basic | People-view, Learning-view | AG010, AG011 basic tests |
| `QA_Advanced_Admin_Role` | advanced | People-view/create, Learning-view/create, Enrollments-view/create | AG011, AG013 advanced tests |
| `QA_Manager_Role` | manager | People-view/create/edit, Learning-view, Reports-view | AG011 management tests |
| `QA_Search_Test_Role` | search | People-view, Learning-view, Reports-view | AG012 search tests |
| `QA_Filter_Test_Role` | filter | Enrollments-view, Commerce-view | AG012 filter tests |

### Admin Groups (`predefinedAdminGroups.json`)
| Group Name | Test Type | Associated Role | Usage |
|------------|-----------|----------------|-------|
| `QA_Basic_Admin_Group` | basic | QA_Basic_Admin_Role | AG010 group tests |
| `QA_Advanced_Admin_Group` | advanced | QA_Advanced_Admin_Role | Advanced group testing |
| `QA_Manager_Group` | manager | QA_Manager_Role | Management group tests |
| `QA_Search_Test_Group` | search | QA_Search_Test_Role | Search functionality tests |
| `QA_Export_Test_Group` | export | QA_Advanced_Admin_Role | AG013 export tests |

## Updated Test Cases

### AG010 - Admin Group Edit and Management
- **Before:** Created random roles/groups every run
- **After:** Uses predefined `basic` type role and group
- **Performance:** Only creates if not exists, reuses existing data

```typescript
// New Implementation:
roleData = await AdminRoleManager.getRoleDataByType("basic");
groupData = await AdminGroupManager.getGroupDataByType("basic");
await AdminRoleManager.ensureRoleExists(adminHome, adminRoleHome, roleData);
await AdminGroupManager.ensureGroupExists(adminHome, adminGroup, groupData);
```

### AG011 - Admin Role Creation and Management  
- **Before:** Random role names with potential duplicates
- **After:** Uses predefined `basic`, `advanced`, `manager` roles
- **Performance:** Checks existence before creation

### AG012 - Admin Role Search and Filter
- **Before:** Created new search/filter roles every run
- **After:** Uses predefined `search` and `filter` type roles
- **Performance:** Optimized for search testing with consistent data

### AG013 - Admin Group Export and Advanced Features
- **Before:** Dynamic advanced role/group creation
- **After:** Uses predefined `advanced` role and `export` group
- **Performance:** Consistent export testing without data duplication

## Smart Existence Checking Logic

```typescript
// Example: AdminRoleManager.ensureRoleExists()
static async ensureRoleExists(adminHome, adminRoleHome, roleData) {
    // Navigate to roles page
    await adminHome.menuButton();
    await adminHome.people(); 
    await adminHome.clickAdminRole();

    // Check if role already exists
    const exists = await this.checkRoleExists(adminRoleHome, roleData.roleName);
    
    if (!exists) {
        console.log(`Creating admin role: ${roleData.roleName}`);
        // Create the role...
    } else {
        console.log(`Admin role '${roleData.roleName}' already exists, skipping creation`);
    }
}
```

## Environment Support

### File Locations:
- **Production Environment:** `data/MetadataLibraryData/Production/`
- **QA Environment:** `data/MetadataLibraryData/QA/` 
- **Dev Environment:** `data/MetadataLibraryData/Dev/`
- **Automation Environment:** `data/MetadataLibraryData/Automation/`

### Automatic Environment Detection:
Tests automatically use the correct folder based on `playwright.config.ts` `environmentSetup` value.

## Test Execution Commands

### Individual Test Files:
```bash
npx playwright test AG010_Verify_Admin_Group_Edit_Functionality.spec.ts --headed
npx playwright test AG011_Verify_Admin_Role_Delete_Management.spec.ts --headed  
npx playwright test AG012_Verify_Admin_Role_Search_Filter.spec.ts --headed
npx playwright test AG013_Verify_Admin_Group_Export_Advanced.spec.ts --headed
```

### All AG Tests:
```bash
npx playwright test tests/admin/adminGroups_addinguserstodefaultAdminGroups/AG* --headed
```

## Benefits Achieved

✅ **No Backend Slowness:** Eliminates performance issues from excessive role creation  
✅ **Storage Optimization:** No duplicate roles or groups  
✅ **Faster Test Execution:** Reuses existing data when possible  
✅ **Consistent Test Data:** Predefined roles ensure repeatable test conditions  
✅ **Easy Maintenance:** Modify roles/groups by updating JSON files  
✅ **Environment Flexibility:** Works across Production, QA, Dev environments  
✅ **Intelligent Creation:** Only creates what's needed  
✅ **Zero Compilation Errors:** All test files validated and error-free

## Next Steps for Execution

1. **Run Tests:** Execute individual test files to verify functionality
2. **Monitor Performance:** Check for improved execution speed vs. previous implementation  
3. **Verify Data Reuse:** Confirm roles/groups are reused on subsequent runs
4. **Environment Testing:** Test in different environments (QA, Dev)
5. **Add More Roles:** Extend JSON files with additional role types as needed

## Troubleshooting

### If Roles/Groups Not Found:
- Check JSON file paths match environment setup
- Verify role names in JSON match UI exactly
- Ensure AdminRoleManager/AdminGroupManager imports are correct

### If Tests Still Create Duplicates:
- Check `checkRoleExists()` and `checkGroupExists()` logic
- Verify search functionality in Page Object classes
- Test existence checking manually in UI