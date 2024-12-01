import { ProjectOwnerGuard } from './project-owner.guard';

describe('ProjectOwnerGuard', () => {
  it('should be defined', () => {
    expect(new ProjectOwnerGuard()).toBeDefined();
  });
});
