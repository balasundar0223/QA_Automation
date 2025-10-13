# Admin Group (AG) Test Suite - Execution Guide

## 📋 Overview

This test suite validates Admin Role and Admin Group functionality using a **predefined data approach** to ensure optimal backend performance and reliable test execution.

## 🎯 Test Structure

### 1. Prerequisites (MUST RUN FIRST)
- **File**: `AG_Prerequisites_Setup.spec.ts`
- **Purpose**: Verify all required test data exists before running AG tests
- **What it does**:
  - ✅ Checks all 5 predefined admin roles exist
  - ✅ Verifies all 5 predefined admin groups exist with correct role mappings
  - ✅ Confirms system readiness for AG test execution

### 2. Main Test Cases
- **AG010**: Admin Group Edit and Management Functionality
- **AG011**: Admin Role Management and Delete Functionality  
- **AG012**: Admin Role Search and Filter Functionality
- **AG013**: Admin Group Export Advanced Functionality

## 🚀 Execution Instructions

### Step 1: Run Prerequisites (CRITICAL)
```bash
npx playwright test tests/admin/adminGroups_addinguserstodefaultAdminGroups/AG_Prerequisites_Setup.spec.ts --headed
```

### Step 2: Run Individual AG Tests
```bash
# Run all AG tests
npx playwright test tests/admin/adminGroups_addinguserstodefaultAdminGroups/AG01*.spec.ts --headed

# Or run individual tests
npx playwright test tests/admin/adminGroups_addinguserstodefaultAdminGroups/AG010_Verify_Admin_Group_Edit_Functionality.spec.ts --headed
npx playwright test tests/admin/adminGroups_addinguserstodefaultAdminGroups/AG011_Verify_Admin_Role_Delete_Management.spec.ts --headed
npx playwright test tests/admin/adminGroups_addinguserstodefaultAdminGroups/AG012_Verify_Admin_Role_Search_Filter.spec.ts --headed
npx playwright test tests/admin/adminGroups_addinguserstodefaultAdminGroups/AG013_Verify_Admin_Group_Export_Advanced.spec.ts --headed
```

## 📊 Predefined Test Data

### Admin Roles
1. **QA_Basic_Admin_Role** - Basic privileges with People View only
2. **QA_Advanced_Admin_Role** - Full comprehensive access across all modules
3. **QA_Manager_Role** - Manager-level access with People and Learning management
4. **QA_Search_Test_Role** - Limited search functionality (People, Learning, Assessment View)
5. **QA_Filter_Test_Role** - Advanced filtering (People View+Edit, Learning View+Edit, Communication View)

### Admin Groups  
1. **QA_Basic_Admin_Group** → Uses QA_Basic_Admin_Role
2. **QA_Advanced_Admin_Group** → Uses QA_Advanced_Admin_Role
3. **QA_Manager_Group** → Uses QA_Manager_Role
4. **QA_Search_Test_Group** → Uses QA_Search_Test_Role
5. **QA_Filter_Test_Group** → Uses QA_Filter_Test_Role

## ⚠️ Important Notes

1. **Prerequisites First**: Always run `AG_Prerequisites_Setup.spec.ts` before any AG tests
2. **Manual Setup**: All predefined roles were created manually via web interface to ensure proper backend data
3. **No Hardcoded Data**: Tests use intelligent existence checking to avoid backend slowness
4. **Environment**: Tests are configured for `qaProduction` environment
5. **Credentials**: Uses `lmsadmin@nomail.com` / `Welcome1@`

## 🔧 Technical Details

### Data Files Location
- **Admin Roles**: `data/MetadataLibraryData/Production/predefinedAdminRoles.json`
- **Admin Groups**: `data/MetadataLibraryData/Production/predefinedAdminGroups.json`
- **QA Environment**: `data/MetadataLibraryData/QA/` (backup copies)

### Utility Classes
- **AdminRoleManager**: Handles intelligent role management with existence checking
- **AdminGroupManager**: Handles intelligent group management with role mapping

### Error Prevention
- ✅ Path resolution fixed for proper JSON data loading
- ✅ Existence checking prevents duplicate creation
- ✅ Predefined data ensures backend performance optimization
- ✅ Separated prerequisites from main test logic

## 📈 Success Indicators

When `AG_Prerequisites_Setup.spec.ts` completes successfully, you should see:
```
✅ All 5 predefined admin roles are available in the system
✅ All 5 predefined admin groups are available with correct role mappings  
🎉 System is ready for AG test suite execution!
```

---
**Created by**: Kathir A  
**Last Updated**: October 11, 2025  
**Framework**: Playwright + TypeScript + Custom Expert Fixture