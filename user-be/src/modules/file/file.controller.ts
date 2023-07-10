import { Controller, Get, Param, Res } from "@nestjs/common";

@Controller()
export class FileController {
    @Get('postPic/:name')
    async servePostPic(@Param('name') name, @Res() res): Promise<any> {
        res.sendFile(name, { root: 'postPic' });
    }
}