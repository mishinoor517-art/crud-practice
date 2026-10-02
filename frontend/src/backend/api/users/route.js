let users = [
  {
    id: 1,
    phone: "03001234567",
    name: "Ali",
    gmail: "ali@gmail.com",
    image: "profile1.jpg",
  },
  {
    id: 2,
    phone: "03111234567",
    name: "Sara",
    gmail: "sara@gmail.com",
    image: "profile2.jpg",
  },
];

export async function GET() {
  return Response.json(users);
}

export async function POST(request) {
  const body = await request.json();

  const newUser = {
    id: users.length + 1,
    phone: body.phone,
    name: body.name,
    gmail: body.gmail,
    image: body.image,
  };

  users.push(newUser);

  return Response.json(newUser, { status: 201 });
}