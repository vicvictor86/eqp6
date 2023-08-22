import { Post } from '@models/entities/Post';
import { User } from '@models/entities/User';
import { FakeCommentsRepository } from '@models/repositories/fakes/FakeCommentsRepository';
import { FakePostsRepository } from '@models/repositories/fakes/FakePostsRepository';
import { Comment } from '@models/entities/Comment';
import { ShowCommentsService } from '../ShowCommentsService';
import { Photo } from '@models/entities/Photo';

describe('ShowCommentsService', () => {
  let fakeCommentsRepository: FakeCommentsRepository;
  let fakePostsRepository: FakePostsRepository; // Adicione esta linha
  let showCommentsService: ShowCommentsService;

  beforeEach(() => {
    fakeCommentsRepository = new FakeCommentsRepository();
    fakePostsRepository = new FakePostsRepository(); // Crie a instância fictícia de posts
    showCommentsService = new ShowCommentsService(
      fakeCommentsRepository,
      fakePostsRepository,
    ); // Passe ambas as instâncias
  });

  it('should fetch comments with pagination when post exists', async () => {
    const postId = '12345';
    const limit = 10;
    const offset = 0;

    // Fake user
    const fakeUser: User = {
      id: 'user1',
      realName: 'Fake User',
      username: 'fakeuser',
      email: 'fakeuser@example.com',
      password: 'password',
      avatar: undefined,
      bio: 'This is a fake user.',
      confirmed: false,
      isAdmin: false,
      photos: [],
      posts: [],
      comments: [],
      commentsEvaluations: [],
      postsEvaluations: [],
      createdAt: new Date(),
      updatedAt: new Date(),

      // Add any other required properties based on the User entity
    };
    const fakePhoto: Photo = {
      id: 'photo1',
      path: 'path/to/fake-photo.jpg',
      size: 12345, // Tamanho fictício em bytes
      userId: 'user1', // Supondo que 'user1' seja o ID de um usuário fictício
      user: fakeUser, // Supondo que fakeUser seja uma instância fictícia de User
      posts: [], // Você pode adicionar objetos fictícios Post aqui, se necessário
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const fakePost: Post = {
      id: 'post1',
      description: 'Description of the fake post.', // Use "description" em vez de "text"
      filterUsed: 'some_filter', // Adicione um valor para o campo "filterUsed"
      userId: fakeUser.id,
      user: fakeUser,
      photoId: 'photo1', // Você pode precisar criar um objeto fictício Photo correspondente
      photo: fakePhoto, // Adicione um objeto fictício Photo aqui
      comments: [],
      evaluations: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const fakeComment: Comment = {
      id: 'comment1',
      text: 'This is a fake comment 1!',
      userId: fakeUser.id,
      postId,
      user: fakeUser,
      post: fakePost, // Adicione um objeto fictício Post aqui
      evaluations: [], // Adicione uma lista de objetos fictícios CommentEvaluation aqui
      createdAt: new Date(), // Adicione esta linha
      updatedAt: new Date(), // Adicione esta linha
    };
    // Fake comments for the given postId
    fakeCommentsRepository.setComments([
      {
        id: 'comment1',
        text: 'This is a fake comment 1!',
        userId: fakeUser.id,
        postId: postId,
        user: fakeUser,
        // Other properties
      },
      // Other fake comments
    ]);

    const result = await showCommentsService.execute(postId, limit, offset);

    expect(result.comments).toHaveLength(1); // Expecting one comment for this postId
    expect(result.totalComments).toEqual(1);
    expect(result.totalPages).toEqual(1);
    expect(result.offset).toEqual(offset);
  });

  // Other test cases, such as when post doesn't exist, etc.
});
