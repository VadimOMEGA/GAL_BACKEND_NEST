import { Module } from '@nestjs/common';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { BlogsModule } from 'src/blogs/blogs.module';
import { ManagementModule } from 'src/management/management.module';
import { DocumentsModule } from 'src/documents/documents.module';

@Module({
  imports: [
    BlogsModule,
    ManagementModule,
    DocumentsModule
  ],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule {}
