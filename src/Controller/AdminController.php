<?php

namespace App\Controller;

use App\Entity\Post;
use App\Entity\Song;
use App\Entity\User;
use App\Type\PostType;
use App\Type\SongType;
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
                $songToDelete = $em->getRepository(Song::class)->find($songId);
                if ($songToDelete !== null) {
                    $em->remove($songToDelete);
                }
            }
            // SONG ACTIVATION
            if ($request->request->has('activation_song')) {
                $songId = $request->request->get('activation_song');
                $songToChangeState = $em->getRepository(Song::class)->find($songId);
                if ($songToChangeState !== null) {
                    $songToChangeState->setActivated(!$songToChangeState->isActivated());
                }
            }
        }

        $em->flush();

        $songs = $em->getRepository(Song::class)->findBy([], ['id' => 'desc']);

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
                $postToDelete = $em->getRepository(Post::class)->find($postId);
                if ($postToDelete !== null) {
                    $em->remove($postToDelete);
                }
            }
            // POST ACTIVATION
            if ($request->request->has('activation_post')) {
                $postId = $request->request->get('activation_post');
                $postToChangeState = $em->getRepository(Post::class)->find($postId);
                if ($postToChangeState !== null) {
                    $postToChangeState->setActivated(!$postToChangeState->isActivated());
                }
            }
        }

        $em->flush();

        $posts = $em->getRepository(Post::class)->findBy([], ['id' => 'desc']);

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
}