import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document, SchemaOptions } from 'mongoose';

const options: SchemaOptions = {
	id: false,
	timestamps: true,
};

@Schema(options)
export class Socket extends Document {
	@Prop({ unique: true, required: true })
	@IsNotEmpty()
	@IsString()
	id: string;

	@Prop({ required: true })
	@IsNotEmpty()
	@IsString()
	username: string;
}

export const SocketSchema = SchemaFactory.createForClass(Socket);
