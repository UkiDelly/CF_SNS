import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostEntity } from './posts/entities/posts.entity';
import { PostsModule } from './posts/posts.module';
import { UserEntity } from './users/entity/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    PostsModule,
    // TypeORM은 사용하귀 위해서는 TypeOrmModule.forRoot()를 사용
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'nestjs_tutorial',
      synchronize: true,
      entities: [PostEntity, UserEntity],
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
