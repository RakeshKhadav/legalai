import { testingSchema } from "@/app/lib/test-schema";

export async function GET() {
    try {
        await testingSchema();
        return Response.json({
            message: "Schema test completed. Check console for details.",
            success: true,
        }, { status: 200 });
    } catch (error) {
        console.error("Error during schema test:", error);
        return Response.json({
            message: "Error during schema test. Check console for details.",
            success: false,
        }, { status: 500 });
    }
}