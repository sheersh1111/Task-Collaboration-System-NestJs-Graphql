import { SetMetadata } from '@nestjs/common';

// This decorator will be used to set the guard type dynamically
export const GuardType = (guardType: string) => SetMetadata('guardType', guardType);
