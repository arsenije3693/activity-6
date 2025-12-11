// app/api/albums/[id]/route.ts
import { NextResponse } from "next/server";
import { AlbumService } from "../../../../lib/services/albumService";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";

export async function GET(_: any, { params }: any) {
  const album = AlbumService.getById(Number(params.id));
  if (!album) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return NextResponse.json(album);
}

export async function PUT(req: Request, { params }: any) {
  const session = await getServerSession(authOptions);

  const body = await req.json();

  try {
    const updated = AlbumService.update(session, Number(params.id), body);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 403 });
  }
}

export async function DELETE(_: any, { params }: any) {
  const session = await getServerSession(authOptions);
  
  if (session?.user?.role !== "admin") {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const { albums } = await import("../../../../lib/albums");
  const index = albums.findIndex(a => a.id === Number(params.id));
  
  if (index === -1) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  
  albums.splice(index, 1);
  return NextResponse.json({ message: "Deleted" });
}
