import connectDB from "../../../lib/mongodb";
import User from "../../../models/User";

export async function GET() {
  try {
    await connectDB();

    const users = await User.find();

    return Response.json(users);
  } catch (error) {
    return Response.json(
      {
        message: "Failed to fetch users",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const newUser = await User.create({
      phone: body.phone,
      name: body.name,
      gmail: body.gmail,
      image: body.image,
    });

    return Response.json(newUser, { status: 201 });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to create user",
        error: error.message,
      },
      { status: 500 }
    );
  }
}