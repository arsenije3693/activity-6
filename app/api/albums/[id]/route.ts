// app/api/albums/[id]/route.ts
import { NextResponse } from "next/server";
import { AlbumService } from "../../../../lib/services/albumService";
import { getServerSession } from "next-auth";

export async function GET(_: any, { params }: any) {
  const album = AlbumService.getById(Number(params.id));
  if (!album) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
  return NextResponse.json(album);
}

export async function PUT(req: Request, { params }: any) {
  const session = await getServerSession();

  const body = await req.json();

  try {
    const updated = AlbumService.update(session, Number(params.id), body);
    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 403 });
  }
}

export async function DELETE(_: any, { params }: any) {
  const session = await getServerSession();

  try {
    AlbumService.delete(session, Number(params.id));
    return NextResponse.json({ message: "Deleted" });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 403 });
  }
}
