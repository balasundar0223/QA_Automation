import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

interface ExportUser {
    name: string;
    username: string;
}

interface UIDataJson {
    timestamp: string;
    totalUsers: number;
    extractedFrom: string;
    users: ExportUser[];
}

export async function assertResponse(receivedResponse: any, expectedResponse?: any) {
    if (receivedResponse !== expectedResponse) {
        throw new Error(`Expected Response ${expectedResponse} but received ${receivedResponse}`);
    }else {
        console.log(`Got expected Response: ${expectedResponse}`);
    }
}

export async function assertStatus(receivedStatus: any, expectedStatus?: any) {
    if (receivedStatus !== expectedStatus) {
        throw new Error(`Expected status ${expectedStatus} but received ${receivedStatus}`);
    } else {
        console.log(`Got expected status: ${expectedStatus}`);
    }
}

/**
 * Stores UI extracted user data to JSON file for later validation
 * @param users - Array of users with name and username
 * @param customPath - Optional custom path for JSON file
 */
export async function storeUIUserDataToJson(users: ExportUser[], customPath?: string): Promise<void> {
    const jsonData: UIDataJson = {
        timestamp: new Date().toISOString(),
        totalUsers: users.length,
        extractedFrom: "UI ADDED USERS section",
        users: users
    };
    
    const filePath = customPath || path.join(process.cwd(), 'test-results', 'addedUsers.json');
    
    // Create directory if it doesn't exist
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
    
    fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
    console.log(`UI user data stored to: ${filePath}`);
}
