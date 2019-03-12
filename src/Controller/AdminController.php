<?php

namespace App\Controller;

use App\Entity\Post;
use App\Entity\Song;
use App\Entity\User;
use App\Entity\Video;
use App\Type\PostType;
use App\Type\SongType;
use App\Type\VideoType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\AccessDeniedHttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class AdminController
 * @package App\Controller
 *
 * @Route(schemes={"%protocol%"})
 */
class AdminController extends AbstractController
{
    public const AUTHORIZED_USERS = ['101146454', '240406653'];

    /**
     * @return bool
     */
    private function checkUserPermissions()
    {
        /** @var User $user */
        $user = $this->getUser();
        return in_array($user->getTwitchId(), self::AUTHORIZED_USERS);
    }

    /**
     * @Route("/admin", name="admin")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     *
     * @return RedirectResponse|Response
     */
    public function adminAction()
    {
        if (!$this->checkUserPermissions()) {
            return $this->redirectToRoute('live');
        }

        return $this->render('admin/admin.html.twig');
    }

    /**
     * @Route("/admin/songs", name="admin_songs")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     *
     * @param Request $request
     *
     * @return RedirectResponse|Response
     */
    public function songAdminAction(Request $request)
    {
        if (!$this->checkUserPermissions()) {
            return $this->redirectToRoute('live');
        }

        $em = $this->getDoctrine()->getManager();
        $songRepo = $em->getRepository(Song::class);

        // SONG FORM
        $song = new Song();
        $songForm = $this->createForm(SongType::class, $song);
        $songForm->handleRequest($request);
        if ($songForm->isSubmitted() && $songForm->isValid()) {
            $em->persist($song);
        }

        // HANDLE CHANGES
        if ($request->isMethod(Request::METHOD_POST)) {
            // SONG DELETE
            if ($request->request->has('delete_song')) {
                $songId = $request->request->get('delete_song');
                $songToDelete = $songRepo->find($songId);
                if ($songToDelete !== null) {
                    $em->remove($songToDelete);
                }
            }
            // SONG ACTIVATION
            if ($request->request->has('activation_song')) {
                $songId = $request->request->get('activation_song');
                $songToChangeState = $songRepo->find($songId);
                if ($songToChangeState !== null) {
                    $songToChangeState->setActivated(!$songToChangeState->isActivated());
                }
            }
        }

        $em->flush();

        $songs = $songRepo->findBy([], ['id' => 'desc']);

        return $this->render('admin/songs.html.twig', [
            'songForm' => $songForm->createView(),
            'songs' => $songs,
        ]);
    }

    /**
     * @Route("/admin/songs/category", name="admin_songs_category")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     *
     * @param Request $request
     * @return JsonResponse|RedirectResponse
     */
    public function songCategoryAction(Request $request)
    {
        if (!$this->checkUserPermissions()) {
            throw new AccessDeniedHttpException();
        }

        if (!$request->query->has('id') || !$request->query->has('category')) {
            throw new AccessDeniedHttpException();
        }

        $id = $request->query->get('id');
        $category = $request->query->get('category');
        if (!in_array($category, [Song::CATEGORY_MIX, Song::CATEGORY_SONG])) {
            throw new NotFoundHttpException();
        }

        $em = $this->getDoctrine()->getManager();

        $song = $em->getRepository(Song::class)->find($id);
        if ($song === null) {
            throw new NotFoundHttpException();
        }

        $song->setCategory($category);

        $em->flush();

        return new JsonResponse(['message' => 'Ok']);
    }

    /**
     * @Route("/admin/songs/sort", name="admin_songs_sort")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     *
     * @param Request $request
     * @return JsonResponse|RedirectResponse
     */
    public function songSortAction(Request $request)
    {
        if (!$this->checkUserPermissions()) {
            throw new AccessDeniedHttpException();
        }

        if (!$request->query->has('id') || !$request->query->has('sort')) {
            throw new AccessDeniedHttpException();
        }

        $id = $request->query->get('id');
        $sort = (int)$request->query->get('sort');

        $em = $this->getDoctrine()->getManager();

        $song = $em->getRepository(Song::class)->find($id);
        if ($song === null) {
            throw new NotFoundHttpException();
        }

        $song->setSort($sort);

        $em->flush();

        return new JsonResponse(['message' => 'Ok']);
    }

    /**
     * @Route("/admin/posts", name="admin_posts")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     *
     * @param Request $request
     *
     * @return RedirectResponse|Response
     */
    public function postAdminAction(Request $request)
    {
        if (!$this->checkUserPermissions()) {
            return $this->redirectToRoute('live');
        }

        $em = $this->getDoctrine()->getManager();
        $postRepo = $em->getRepository(Post::class);

        // POST FORM
        $post = new Post();
        $postForm = $this->createForm(PostType::class, $post);
        $postForm->handleRequest($request);
        if ($postForm->isSubmitted() && $postForm->isValid()) {
            $em->persist($post);
        }

        // HANDLE CHANGES
        if ($request->isMethod(Request::METHOD_POST)) {
            // POST DELETE
            if ($request->request->has('delete_post')) {
                $postId = $request->request->get('delete_post');
                $postToDelete = $postRepo->find($postId);
                if ($postToDelete !== null) {
                    $em->remove($postToDelete);
                }
            }
            // POST ACTIVATION
            if ($request->request->has('activation_post')) {
                $postId = $request->request->get('activation_post');
                $postToChangeState = $postRepo->find($postId);
                if ($postToChangeState !== null) {
                    $postToChangeState->setActivated(!$postToChangeState->isActivated());
                }
            }
        }

        $em->flush();

        $posts = $postRepo->findBy([], ['id' => 'desc']);

        return $this->render('admin/posts.html.twig', [
            'postForm' => $postForm->createView(),
            'posts' => $posts,
        ]);
    }

    /**
     * @Route("/admin/posts/sort", name="admin_posts_sort")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     *
     * @param Request $request
     * @return JsonResponse|RedirectResponse
     */
    public function postSortAction(Request $request)
    {
        if (!$this->checkUserPermissions()) {
            throw new AccessDeniedHttpException();
        }

        if (!$request->query->has('id') || !$request->query->has('sort')) {
            throw new AccessDeniedHttpException();
        }

        $id = $request->query->get('id');
        $sort = (int)$request->query->get('sort');

        $em = $this->getDoctrine()->getManager();

        $post = $em->getRepository(Post::class)->find($id);
        if ($post === null) {
            throw new NotFoundHttpException();
        }

        $post->setSort($sort);

        $em->flush();

        return new JsonResponse(['message' => 'Ok']);
    }

    /**
     * @Route("/admin/videos", name="admin_videos")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     *
     * @param Request $request
     *
     * @return RedirectResponse|Response
     */
    public function videoAdminAction(Request $request)
    {
        if (!$this->checkUserPermissions()) {
            return $this->redirectToRoute('live');
        }

        $em = $this->getDoctrine()->getManager();
        $videoRepo = $em->getRepository(Video::class);

        // VIDEO FORM
        $video = new Video();
        $videoForm = $this->createForm(VideoType::class, $video);
        $videoForm->handleRequest($request);
        if ($videoForm->isSubmitted() && $videoForm->isValid()) {
            $em->persist($video);
        }

        // HANDLE CHANGES
        if ($request->isMethod(Request::METHOD_POST)) {
            // VIDEO DELETE
            if ($request->request->has('delete_video')) {
                $videoId = $request->request->get('delete_video');
                $videoToDelete = $videoRepo->find($videoId);
                if ($videoToDelete !== null) {
                    $em->remove($videoToDelete);
                }
            }
            // VIDEO ACTIVATION
            if ($request->request->has('activation_video')) {
                $videoId = $request->request->get('activation_video');
                $videoToChangeState = $videoRepo->find($videoId);
                if ($videoToChangeState !== null) {
                    $videoToChangeState->setActivated(!$videoToChangeState->isActivated());
                }
            }
        }

        $em->flush();

        $videos = $videoRepo->findBy([], ['id' => 'desc']);

        return $this->render('admin/videos.html.twig', [
            'videoForm' => $videoForm->createView(),
            'videos' => $videos,
        ]);
    }

    /**
     * @Route("/admin/vides/sort", name="admin_videos_sort")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     *
     * @param Request $request
     * @return JsonResponse|RedirectResponse
     */
    public function videoSortAction(Request $request)
    {
        if (!$this->checkUserPermissions()) {
            throw new AccessDeniedHttpException();
        }

        if (!$request->query->has('id') || !$request->query->has('sort')) {
            throw new AccessDeniedHttpException();
        }

        $id = $request->query->get('id');
        $sort = (int)$request->query->get('sort');

        $em = $this->getDoctrine()->getManager();

        $video = $em->getRepository(Video::class)->find($id);
        if ($video === null) {
            throw new NotFoundHttpException();
        }

        $video->setSort($sort);

        $em->flush();

        return new JsonResponse(['message' => 'Ok']);
    }
}