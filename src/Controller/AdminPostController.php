<?php

namespace App\Controller;

use App\Entity\Post;
use App\Type\PostType;
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
 * Class AdminPostController
 * @package App\Controller
 *
 * @Route("/admin/posts", schemes={"%protocol%"})
 */
class AdminPostController extends AbstractController
{
    /**
     * @Route("/", name="admin_posts")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     * @IsGranted("TWITCH_ID")
     *
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function postsAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();
        $postRepo = $em->getRepository(Post::class);

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

        return $this->render('admin/post/posts.html.twig', [
            'posts' => $posts,
        ]);
    }

    /**
     * @Route("/create", name="admin_posts_create")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     * @IsGranted("TWITCH_ID")
     *
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function createPostAction(Request $request)
    {
        $em = $this->getDoctrine()->getManager();

        $post = new Post();
        $postForm = $this->createForm(PostType::class, $post);

        $postForm->handleRequest($request);
        if ($postForm->isSubmitted() && $postForm->isValid()) {
            $em->persist($post);
            $em->flush();

            return $this->redirectToRoute('admin_posts');
        }

        return $this->render('admin/post/create.html.twig', [
            'postForm' => $postForm->createView(),
        ]);
    }

    /**
     * @Route("/edit/{id}", name="admin_posts_edit")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     * @IsGranted("TWITCH_ID")
     *
     * @param Request $request
     * @param Post $post
     * @return RedirectResponse|Response
     */
    public function editPostAction(Request $request, Post $post)
    {
        $em = $this->getDoctrine()->getManager();

        $postForm = $this->createForm(PostType::class, $post);

        $postForm->handleRequest($request);
        if ($postForm->isSubmitted() && $postForm->isValid()) {
            $em->flush();

            return $this->redirectToRoute('admin_posts');
        }

        return $this->render('admin/post/update.html.twig', [
            'post' => $post,
            'postForm' => $postForm->createView(),
        ]);
    }

    /**
     * @Route("/sort", name="admin_posts_sort")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     * @IsGranted("TWITCH_ID")
     *
     * @param Request $request
     * @return JsonResponse|RedirectResponse
     */
    public function postSortAction(Request $request)
    {
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