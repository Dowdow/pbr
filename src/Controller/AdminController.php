<?php

namespace App\Controller;

use App\Entity\Post;
use App\Entity\Song;
use App\Entity\User;
use App\Type\PostType;
use App\Type\SongType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class AdminController
 * @package App\Controller
 *
 * @Route(schemes={"%protocol%"})
 */
class AdminController extends Controller
{
    /**
     * @Route("/admin", name="admin")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     *
     * @param Request $request
     *
     * @return RedirectResponse|Response
     */
    public function adminAction(Request $request)
    {
        /** @var User $user */
        $user = $this->getUser();
        if (!in_array($user->getTwitchId(), ['101146454', '240406653'])) {
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

        $songs = $em->getRepository(Song::class)->findBy([], ['id' => 'desc']);
        $posts = $em->getRepository(Post::class)->findBy([], ['id' => 'desc']);

        return $this->render('admin.html.twig', [
            'songForm' => $songForm->createView(),
            'songs' => $songs,
            'postForm' => $postForm->createView(),
            'posts' => $posts
        ]);
    }
}