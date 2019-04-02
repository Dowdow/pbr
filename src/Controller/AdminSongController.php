<?php

namespace App\Controller;

use App\Entity\Song;
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
 * Class AdminSongController
 * @package App\Controller
 *
 * @Route(schemes={"%protocol%"})
 */
class AdminSongController extends AbstractController
{
    /**
     * @Route("/admin/songs", name="admin_songs")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     * @IsGranted("TWITCH_ID")
     *
     * @param Request $request
     * @return RedirectResponse|Response
     */
    public function songAdminAction(Request $request)
    {
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

        return $this->render('admin/song/songs.html.twig', [
            'songForm' => $songForm->createView(),
            'songs' => $songs,
        ]);
    }

    /**
     * @Route("/admin/songs/category", name="admin_songs_category")
     * @IsGranted("IS_AUTHENTICATED_FULLY")
     * @IsGranted("TWITCH_ID")
     *
     * @param Request $request
     * @return JsonResponse|RedirectResponse
     */
    public function songCategoryAction(Request $request)
    {
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
     * @IsGranted("TWITCH_ID")
     *
     * @param Request $request
     * @return JsonResponse|RedirectResponse
     */
    public function songSortAction(Request $request)
    {
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
}