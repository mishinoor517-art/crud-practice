import connectDB from "../../../../lib/mongodb";
import User from "../../../../models/User";

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const user = await User.findById(id);

    if (!user) {
      return Response.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return Response.json(user);
  } catch (error) {
    return Response.json(
      {
        message: "Failed to fetch user",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await request.json();

    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        phone: body.phone,
        name: body.name,
        gmail: body.gmail,
        image: body.image || "",
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedUser) {
      return Response.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return Response.json(updatedUser);
  } catch (error) {
    return Response.json(
      {
        message: "Failed to update user",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return Response.json(
        {
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return Response.json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to delete user",
        error: error.message,
      },
      { status: 500 }
    );
  }
}